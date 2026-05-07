const DEFAULT_BLACKCAT_BASE_URL = "https://api.blackcatpay.com.br/api";

function toCents(value) {
  return Math.round(Number(value) * 100);
}

function fromCents(value) {
  return typeof value === "number" ? value / 100 : undefined;
}

function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeString(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return normalizeString(value).toLowerCase();
}

function inferDocumentType(document) {
  return document.length > 11 ? "cnpj" : "cpf";
}

function getBaseUrl() {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

function getBlackcatApiBase() {
  return (
    process.env.BLACKCAT_API_BASE_URL ||
    process.env.PIX_API_URL ||
    DEFAULT_BLACKCAT_BASE_URL
  ).replace(/\/$/, "");
}

function getApiKey() {
  return process.env.BLACKCAT_API_KEY || process.env.PIX_API_KEY || "";
}

function getFallbackDocument() {
  return normalizeDigits(
    process.env.BLACKCAT_DEFAULT_DOCUMENT || process.env.PIX_DEFAULT_DOCUMENT || "",
  );
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeBlackcatResponse(payload, fallbackAmount) {
  const data = payload?.data || payload || {};
  const paymentData = data?.paymentData || {};
  const rawQrCode =
    paymentData?.qrCodeBase64 ||
    paymentData?.qrCodeBase64Image ||
    paymentData?.qr_code_base64 ||
    paymentData?.qrCodeImage ||
    paymentData?.qr_code_image ||
    "";

  const qrCode =
    typeof rawQrCode === "string" && rawQrCode.startsWith("data:image")
      ? rawQrCode
      : rawQrCode
        ? `data:image/png;base64,${rawQrCode}`
        : "";

  return {
    qrCode,
    qrCodeBase64: qrCode,
    copyAndPaste: paymentData?.copyPaste || paymentData?.qrCode || "",
    copyPaste: paymentData?.copyPaste || paymentData?.qrCode || "",
    transactionId: data?.transactionId || "",
    amount: fromCents(data?.amount) || fallbackAmount,
    status: data?.status || payload?.status || "PENDING",
    expiresAt: paymentData?.expiresAt || data?.expiresAt || null,
    invoiceUrl: data?.invoiceUrl || null,
    paidAt: data?.paidAt || null,
  };
}

function shouldRetryStatus(status) {
  return status === 500 || status === 502 || status === 503 || status === 504;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendOrderToWebhook(payload) {
  const webhookUrl = process.env.ORDER_LOG_WEBHOOK_URL || "";
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("ORDER LOG WEBHOOK ERROR", error);
  }
}

async function createPixCharge(input) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      status: 500,
      body: { message: "Configure BLACKCAT_API_KEY na Vercel." },
    };
  }

  const parsedAmount = Number(input.amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return {
      status: 400,
      body: { message: "Valor invalido para gerar Pix." },
    };
  }

  const customer = input.customer || {};
  const address = customer.address || {};
  const attribution = input.attribution || {};
  const document = normalizeDigits(customer.document) || getFallbackDocument();
  const email = normalizeEmail(customer.email);
  const fullName = normalizeString(customer.fullName || customer.name);
  const phone = normalizeDigits(customer.phone);

  if (!fullName || !email || !phone) {
    return {
      status: 400,
      body: { message: "Nome, e-mail e telefone sao obrigatorios." },
    };
  }

  if (!document) {
    return {
      status: 500,
      body: { message: "Configure BLACKCAT_DEFAULT_DOCUMENT ou envie CPF/CNPJ." },
    };
  }

  const items = (input.items || []).map((item) => ({
    title: normalizeString(item.name) || "Edredom Premium",
    quantity: Number(item.quantity || 1),
    unitPrice: toCents(Number(item.unitPrice || item.totalPrice || parsedAmount)),
    tangible: true,
  }));

  if (!items.length || items.some((item) => item.unitPrice <= 0)) {
    return {
      status: 400,
      body: { message: "Envie ao menos um item valido para gerar Pix." },
    };
  }

  const body = {
    amount: toCents(parsedAmount),
    currency: "BRL",
    paymentMethod: "pix",
    items,
    customer: {
      name: fullName,
      email,
      phone,
      document: {
        number: document,
        type: inferDocumentType(document),
      },
      address: {
        zipCode: normalizeString(address.cep || address.zipcode) || "00000-000",
        street: normalizeString(address.street || address.address) || "Rua nao informada",
        number: normalizeString(address.number) || "S/N",
        neighborhood: normalizeString(address.neighborhood) || "Centro",
        complement: normalizeString(address.complement) || "Sem complemento",
        city: normalizeString(address.city) || "Cidade nao informada",
        state: normalizeString(address.state).toUpperCase() || "SP",
        country: "BR",
      },
    },
    pix: {
      expiresInDays: 1,
    },
    postbackUrl: `${getBaseUrl()}/api/pix/webhook`,
    externalRef: `edredom-${Date.now()}`,
    metadata: JSON.stringify({
      source: "lojaspremiium",
      utm_source: attribution.utm_source || "",
      utm_medium: attribution.utm_medium || "",
      utm_campaign: attribution.utm_campaign || "",
      utm_content: attribution.utm_content || "",
      utm_term: attribution.utm_term || "",
      fbclid: attribution.fbclid || "",
    }),
  };

  const requestSale = async () => {
    const response = await fetch(`${getBlackcatApiBase()}/sales/create-sale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const rawText = await response.text();
    const payload = safeJsonParse(rawText) || {};
    return { response, payload, rawText };
  };

  let attempt = await requestSale();

  if (shouldRetryStatus(attempt.response.status)) {
    await wait(1200);
    attempt = await requestSale();
  }

  if (!attempt.response.ok || attempt.payload?.success === false) {
    return {
      status: attempt.response.ok ? 400 : attempt.response.status,
      body: {
        message:
          attempt.payload?.message ||
          attempt.payload?.error ||
          "A BlackCat retornou erro ao gerar o Pix.",
        details:
          attempt.payload && Object.keys(attempt.payload).length
            ? attempt.payload
            : attempt.rawText,
      },
    };
  }

  const normalized = normalizeBlackcatResponse(attempt.payload, parsedAmount);

  await sendOrderToWebhook({
    createdAt: new Date().toISOString(),
    transactionId: normalized.transactionId,
    externalRef: body.externalRef,
    fullName,
    email,
    phone,
    amount: parsedAmount,
    status: normalized.status,
    ...attribution,
  });

  return {
    status: 200,
    body: normalized,
  };
}

async function getPixStatus(transactionId) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      status: 500,
      body: { message: "Configure BLACKCAT_API_KEY na Vercel." },
    };
  }

  if (!transactionId) {
    return {
      status: 400,
      body: { message: "Informe o transactionId." },
    };
  }

  const response = await fetch(
    `${getBlackcatApiBase()}/sales/${encodeURIComponent(transactionId)}/status`,
    { headers: { "X-API-Key": apiKey } },
  );
  const rawText = await response.text();
  const payload = safeJsonParse(rawText) || {};

  if (!response.ok || payload?.success === false) {
    return {
      status: response.ok ? 400 : response.status,
      body: {
        message: payload?.message || payload?.error || "Erro ao consultar Pix.",
        details: Object.keys(payload).length ? payload : rawText,
      },
    };
  }

  return {
    status: 200,
    body: normalizeBlackcatResponse(payload, 0),
  };
}

async function receivePixWebhook(input) {
  const webhookSecret = process.env.BLACKCAT_WEBHOOK_SECRET || process.env.PIX_WEBHOOK_SECRET;

  if (webhookSecret && input?.raw && typeof input.raw === "object") {
    const providedSecret = input.raw.secret || input.raw.token;
    if (providedSecret !== webhookSecret) {
      return {
        status: 401,
        body: { message: "Webhook Pix nao autorizado." },
      };
    }
  }

  return {
    status: 200,
    body: {
      received: true,
      event: input.event || "unknown",
      transactionId: input.transactionId || null,
      status: input.status || "received",
    },
  };
}

module.exports = {
  createPixCharge,
  getPixStatus,
  receivePixWebhook,
};

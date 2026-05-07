const { createPixCharge } = require("../../server/pix.js");

async function readJsonBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
}

function isValidPixRequest(body) {
  return (
    body &&
    typeof body === "object" &&
    Number.isFinite(Number(body.amount)) &&
    Number(body.amount) > 0 &&
    Array.isArray(body.items) &&
    body.items.length > 0 &&
    body.customer &&
    typeof body.customer === "object"
  );
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Metodo nao permitido." }));
    return;
  }

  try {
    const body = req.body && typeof req.body === "object" ? req.body : await readJsonBody(req);

    if (!isValidPixRequest(body)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Payload invalido para gerar Pix." }));
      return;
    }

    const result = await createPixCharge(body);
    res.statusCode = result.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.body));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Nao foi possivel gerar o Pix agora.",
        details: error instanceof Error ? error.message : String(error),
      }),
    );
  }
};

const productCatalog = {
  branco: {
    label: "Branco Nuvem",
    image: "img/branco-nuvem.png",
  },
  rosa: {
    label: "Rosa Aconchego",
    image: "img/rosa-aconchego.png",
  },
  cinza: {
    label: "Cinza Serenity",
    image: "img/cinza-serenity.png",
  },
};

const sizeCatalog = {
  solteiro: {
    label: "Solteiro (150 x 220 cm)",
    price: 99.9,
  },
  casal: {
    label: "Casal (180 x 220 cm)",
    price: 127.9,
  },
  queen: {
    label: "Queen (220 x 240 cm)",
    price: 147.9,
  },
  king: {
    label: "King (240 x 260 cm)",
    price: 167.9,
  },
};

const scrollLinks = document.querySelectorAll("[data-scroll]");
const animatedElements = document.querySelectorAll("[data-animate]");
const menuOpenButton = document.querySelector("[data-menu-open]");
const menuCloseTriggers = document.querySelectorAll("[data-menu-close]");
const mobileMenu = document.querySelector("#mobile-menu");
const mainImage = document.querySelector("[data-main-image]");
const galleryThumbs = document.querySelectorAll("[data-gallery-thumb]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxOpenButton = document.querySelector("[data-lightbox-open]");
const lightboxCloseButton = document.querySelector("[data-lightbox-close]");
const colorOptions = document.querySelectorAll("[data-color-option]");
const colorJumpLinks = document.querySelectorAll("[data-select-color]");
const sizeOptions = document.querySelectorAll("[data-size-option]");
const selectedColorText = document.querySelector("[data-selected-color]");
const selectedSizeText = document.querySelector("[data-selected-size]");
const priceText = document.querySelector("[data-price]");
const installmentsText = document.querySelector("[data-installments]");
const pixPriceText = document.querySelector("[data-pix-price]");
const pixSavingText = document.querySelector("[data-pix-saving]");
const checkoutButton = document.querySelector("[data-checkout-button]");
const inlineCheckout = document.querySelector("[data-inline-checkout]");
const checkoutImage = document.querySelector("[data-checkout-image]");
const checkoutProductText = document.querySelector("[data-checkout-product]");
const checkoutTotalTexts = document.querySelectorAll("[data-checkout-total]");
const checkoutFinishButton = document.querySelector("[data-checkout-finish]");
const pixResult = document.querySelector("[data-pix-result]");
const checkoutOrderImage = document.querySelector("[data-order-image]");
const checkoutOrderProduct = document.querySelector("[data-order-product]");
const checkoutOrderVariant = document.querySelector("[data-order-variant]");
const checkoutOrderSubtotal = document.querySelector("[data-order-subtotal]");
const checkoutOrderDiscount = document.querySelector("[data-order-discount]");
const checkoutOrderShipping = document.querySelector("[data-order-shipping]");
const checkoutOrderTotal = document.querySelector("[data-order-total]");
const checkoutStepItems = document.querySelectorAll("[data-checkout-step-item]");
const checkoutPanels = document.querySelectorAll("[data-checkout-panel]");
const checkoutNextButtons = document.querySelectorAll("[data-checkout-next]");
const checkoutBackButtons = document.querySelectorAll("[data-checkout-back]");
const checkoutSaveAddressButton = document.querySelector("[data-save-address]");
const checkoutAddressCard = document.querySelector("[data-address-card]");
const checkoutAddressText = document.querySelector("[data-address-text]");
const checkoutShippingRadios = document.querySelectorAll("[name='shipping_method']");
const colorRibbonTrack = document.querySelector("[data-color-ribbon]");
const benefitsStory = document.querySelector("[data-benefits-story]");
const benefitsCarousel = document.querySelector("[data-benefits-carousel]");
const benefitSteps = document.querySelectorAll("[data-benefit-step]");
const benefitDots = document.querySelectorAll("[data-benefit-dot]");
const reviewsSection = document.querySelector("#avaliacoes");
const reviewsList = document.querySelector("[data-reviews-list]");
const reviewsPagination = document.querySelector("[data-reviews-pagination]");
const reviewToggleButton = document.querySelector("[data-review-toggle]");
const reviewForm = document.querySelector("[data-review-form]");
const reviewMessage = document.querySelector("[data-review-message]");
const reviewLightbox = document.querySelector("[data-review-lightbox]");
const reviewLightboxImage = document.querySelector("[data-review-lightbox-image]");
const reviewLightboxClose = document.querySelector("[data-review-lightbox-close]");
const footerAccordions = document.querySelectorAll("[data-footer-accordion]");
let mainGalleryStartX = 0;
let mainGalleryStartY = 0;
let mainGalleryDidSwipe = false;
let benefitsAutoScroll = null;
let currentReviewPage = 1;
const submittedReviews = [];

const productState = {
  color: "branco",
  colorLabel: "Branco Nuvem",
  size: "queen",
  sizeLabel: "Queen (220 x 240 cm)",
  image: "img/branco-nuvem.png",
  price: 147.9,
  shipping: 0,
  shippingLabel: "Gratis",
};

const paidPixStatuses = ["paid", "approved", "completed", "confirmed", "success", "succeeded", "received"];

const reviews = [
  {
    name: "Nat Barbosa",
    initials: "NB",
    rating: 5,
    page: 1,
    image: "img/fb1.webp",
    comment:
      "Estou super feliz com a compra. O edredom chegou bem embalado, é muito macio e deixou minha cama com outra aparência. Minha segunda compra com a loja e continuo satisfeita.",
  },
  {
    name: "Mirela Da Mota",
    initials: "MD",
    rating: 5,
    page: 1,
    image: "img/fb2.webp",
    comment:
      "Adorei e amei! Super recomendo, qualidade do produto incrível. Comprei sem medo e quando chegou fiquei surpresa com o conforto.",
  },
  {
    name: "Julia Nóbrega",
    initials: "JN",
    rating: 5,
    page: 1,
    image: "img/fb3.webp",
    comment:
      "Maravilhoso! Produto sensacional e atendimento muito bom. Ele é bem fofinho, bonito e realmente deixa a cama mais aconchegante.",
  },
  {
    name: "Tabata Chaves",
    initials: "TC",
    rating: 5,
    page: 1,
    image: "img/fb4.webp",
    comment:
      "Foi ótima a experiência. Estou super satisfeita, nota 1000 é pouco! Amei, era exatamente o que eu esperava.",
  },
  {
    name: "Bianca Ribeiro",
    initials: "BR",
    rating: 5,
    page: 1,
    image: "img/fb5.webp",
    comment:
      "Chegou antes do prazo e a qualidade me surpreendeu. O toque é muito gostoso e ele não é pesado como outros edredons que já tive.",
  },
  {
    name: "Camila Torres",
    initials: "CT",
    rating: 5,
    page: 1,
    image: "img/fb6.webp",
    comment:
      "Comprei o rosa e ficou perfeito no quarto. Muito macio, lindo pessoalmente e bem confortável para dormir.",
  },
  {
    name: "Bela Camilo",
    initials: "BC",
    rating: 5,
    page: 2,
    comment:
      "Loja confiável! Ótimas opções e produto de qualidade. Fiquei muito feliz com a compra e com o cuidado no atendimento.",
  },
  {
    name: "Sil Ibrahim",
    initials: "SI",
    rating: 5,
    page: 2,
    comment:
      "Super recomendo. Entrega rápida e o principal: produto igual ao anunciado. Muito confortável e bonito.",
  },
  {
    name: "Denise Ourique",
    initials: "DO",
    rating: 5,
    page: 2,
    comment:
      "Excelente produto e loja muito confiável. O edredom é macio, esquenta na medida e fica lindo na cama.",
  },
  {
    name: "Grazi Vieira",
    initials: "GV",
    rating: 5,
    page: 2,
    comment:
      "Gostei bastante. A entrega foi rápida e o produto veio bem embalado. Vou comprar novamente com certeza.",
  },
  {
    name: "Vivi Pinto",
    initials: "VP",
    rating: 5,
    page: 2,
    comment:
      "Muito bom! Achei leve, fofinho e bem confortável. O branco deixou meu quarto com cara de hotel.",
  },
  {
    name: "Larissa Souza",
    initials: "LS",
    rating: 5,
    page: 2,
    comment:
      "Melhor investimento para minha cama. Ficou muito mais bonita e aconchegante, sem contar que é super macio.",
  },
  {
    name: "Renata Lima",
    initials: "RL",
    rating: 5,
    page: 3,
    comment:
      "Produto de muita qualidade. Gostei do acabamento e da sensação ao toque. Valeu muito a pena.",
  },
  {
    name: "Amanda Brito",
    initials: "AB",
    rating: 5,
    page: 3,
    comment:
      "Comprei para presentear minha mãe e ela amou. Disse que ficou muito confortável e leve para usar.",
  },
  {
    name: "Fernanda Rocha",
    initials: "FR",
    rating: 5,
    page: 3,
    comment:
      "O edredom é lindo e bem volumoso. Não fica com aquele aspecto murcho, deixa a cama muito elegante.",
  },
  {
    name: "Patrícia Gomes",
    initials: "PG",
    rating: 5,
    page: 3,
    comment:
      "Achei ótimo para o dia a dia. Fácil de ajeitar na cama, macio e confortável durante a noite.",
  },
  {
    name: "Elaine Martins",
    initials: "EM",
    rating: 5,
    page: 3,
    comment:
      "Muito satisfeita com a compra. O tecido é gostoso, não pinica e passa uma sensação de conforto imediato.",
  },
  {
    name: "Juliana Castro",
    initials: "JC",
    rating: 5,
    page: 3,
    comment:
      "Comprei o cinza e combinou muito com meu quarto. Produto bonito, confortável e com acabamento muito bom.",
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getCheckoutTotals() {
  const pixPrice = Math.round(productState.price * 0.95 * 100) / 100;
  const pixSaving = Math.round((productState.price - pixPrice) * 100) / 100;
  const finalTotal = Math.round((pixPrice + productState.shipping) * 100) / 100;

  return {
    subtotal: productState.price,
    discount: pixSaving,
    shipping: productState.shipping,
    total: finalTotal,
  };
}

function getTrackingProduct(value) {
  return {
    id: `premium-edredom-${productState.color}-${productState.size}`,
    name: `Premium Edredom Termico 2 em 1 - ${productState.colorLabel} - ${productState.sizeLabel}`,
    quantity: 1,
    value: Number(value || getCheckoutTotals().total),
  };
}

function trackMetaEvent(eventName, product, value, options = {}) {
  if (!eventName || !product?.id) {
    return;
  }

  const onceKey = options.onceKey || `${eventName}:${product.id}`;
  window.__premiumMetaEvents = window.__premiumMetaEvents || {};

  if (options.once !== false && window.__premiumMetaEvents[onceKey]) {
    return;
  }

  let attempts = 0;
  const fire = () => {
    attempts += 1;

    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, {
        content_type: "product",
        content_ids: [product.id],
        content_name: product.name,
        num_items: Number(product.quantity || 1),
        currency: "BRL",
        value: Number(value || product.value || 0),
        ...options.extra,
      });
      window.__premiumMetaEvents[onceKey] = true;
      return;
    }

    if (attempts < 20) {
      window.setTimeout(fire, 250);
    }
  };

  fire();
}

function trackInitiateCheckout() {
  const totals = getCheckoutTotals();
  trackMetaEvent("InitiateCheckout", getTrackingProduct(totals.total), totals.total, {
    onceKey: "InitiateCheckout",
  });
}

function trackAddPaymentInfo() {
  const totals = getCheckoutTotals();
  trackMetaEvent("AddPaymentInfo", getTrackingProduct(totals.total), totals.total, {
    onceKey: "AddPaymentInfo",
    extra: {
      payment_method: "pix",
    },
  });
}

function escapeHtml(value) {
  const replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return String(value).replace(/[&<>"']/g, (character) => replacements[character]);
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function openMenu() {
  document.body.classList.add("menu-open");
  menuOpenButton?.setAttribute("aria-expanded", "true");
  mobileMenu?.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuOpenButton?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
}

function openLightbox() {
  if (!lightbox || !lightboxImage || !mainImage) {
    return;
  }

  lightboxImage.src = mainImage.currentSrc || mainImage.src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

// Smooth scrolling base for current and future landing page anchors.
function handleSmoothScroll(event) {
  const link = event.currentTarget;
  const targetId = link.getAttribute("href");

  if (!targetId || !targetId.startsWith("#")) {
    return;
  }

  const target = document.querySelector(targetId);

  if (!target) {
    closeMenu();
    return;
  }

  event.preventDefault();
  closeMenu();
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Adds visibility classes as hero and product elements enter the viewport.
function setupRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.06,
      rootMargin: "0px 0px 12% 0px",
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

function updateMainImage(imageSrc, selectedThumb) {
  if (!mainImage || !imageSrc) {
    return;
  }

  mainImage.classList.add("is-changing");

  window.setTimeout(() => {
    mainImage.classList.remove("is-missing");
    mainImage.parentElement?.classList.remove("has-missing");
    mainImage.src = imageSrc;
    mainImage.alt = selectedThumb?.querySelector("img")?.alt || "Edredom Premium em destaque";
    lightboxImage?.setAttribute("src", imageSrc);
    mainImage.classList.remove("is-changing");
  }, 140);

  galleryThumbs.forEach((thumb) => thumb.classList.remove("is-selected"));
  selectedThumb?.classList.add("is-selected");
}

function getSelectedGalleryIndex() {
  const thumbs = Array.from(galleryThumbs);
  const selectedIndex = thumbs.findIndex((thumb) => thumb.classList.contains("is-selected"));

  return selectedIndex >= 0 ? selectedIndex : 0;
}

function showGalleryImageByOffset(offset) {
  const thumbs = Array.from(galleryThumbs);

  if (!thumbs.length) {
    return;
  }

  const currentIndex = getSelectedGalleryIndex();
  const nextIndex = (currentIndex + offset + thumbs.length) % thumbs.length;
  const nextThumb = thumbs[nextIndex];

  updateMainImage(nextThumb.dataset.image, nextThumb);
  nextThumb.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}

function handleMainGalleryPointerDown(event) {
  mainGalleryStartX = event.clientX;
  mainGalleryStartY = event.clientY;
  mainGalleryDidSwipe = false;
}

function handleMainGalleryPointerUp(event) {
  const deltaX = event.clientX - mainGalleryStartX;
  const deltaY = event.clientY - mainGalleryStartY;
  const isHorizontalSwipe = Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

  if (!isHorizontalSwipe) {
    return;
  }

  mainGalleryDidSwipe = true;
  showGalleryImageByOffset(deltaX < 0 ? 1 : -1);
}

function updateProductPricing() {
  const totals = getCheckoutTotals();
  const pixPrice = productState.price - totals.discount;
  const pixSaving = totals.discount;
  const finalTotal = totals.total;
  const installment = Math.round((productState.price / 12) * 100) / 100;

  if (priceText) {
    priceText.textContent = formatCurrency(productState.price);
  }

  if (installmentsText) {
    installmentsText.textContent = `12x de ${formatCurrency(installment)}`;
  }

  if (pixPriceText) {
    pixPriceText.textContent = formatCurrency(pixPrice);
  }

  if (pixSavingText) {
    pixSavingText.textContent = `Pague com pix e economize ${formatCurrency(pixSaving)}`;
  }

  if (checkoutProductText) {
    checkoutProductText.textContent = `${productState.colorLabel} - ${productState.sizeLabel}`;
  }

  checkoutTotalTexts.forEach((item) => {
    item.textContent = formatCurrency(finalTotal);
  });

  if (checkoutOrderImage) {
    checkoutOrderImage.src = productState.image;
  }

  if (checkoutOrderProduct) {
    checkoutOrderProduct.textContent = "Premium Edredom Termico 2 em 1";
  }

  if (checkoutOrderVariant) {
    checkoutOrderVariant.textContent = `${productState.colorLabel} - ${productState.sizeLabel}`;
  }

  if (checkoutOrderSubtotal) {
    checkoutOrderSubtotal.textContent = formatCurrency(productState.price);
  }

  if (checkoutOrderDiscount) {
    checkoutOrderDiscount.textContent = `- ${formatCurrency(pixSaving)}`;
  }

  if (checkoutOrderShipping) {
    checkoutOrderShipping.textContent = productState.shipping > 0 ? formatCurrency(productState.shipping) : "Gratis";
    checkoutOrderShipping.classList.toggle("is-free-shipping", productState.shipping === 0);
  }

  if (checkoutOrderTotal) {
    checkoutOrderTotal.textContent = formatCurrency(finalTotal);
  }

}

function selectColor(option) {
  productState.color = option.dataset.color || productState.color;
  productState.colorLabel = option.dataset.label || productState.colorLabel;
  const colorImage = option.dataset.image;

  colorOptions.forEach((item) => item.classList.remove("is-selected"));
  option.classList.add("is-selected");

  if (selectedColorText) {
    selectedColorText.textContent = option.dataset.label || "";
  }

  if (colorImage) {
    productState.image = colorImage;
    if (checkoutImage) {
      checkoutImage.src = colorImage;
    }
    const matchingThumb = document.querySelector(`[data-gallery-thumb][data-image="${colorImage}"]`);
    updateMainImage(colorImage, matchingThumb);
  }

  updateProductPricing();
}

function selectSize(option) {
  productState.size = option.dataset.size || productState.size;
  productState.sizeLabel = option.dataset.label || productState.sizeLabel;
  productState.price = Number(option.dataset.price) || productState.price;

  sizeOptions.forEach((item) => item.classList.remove("is-selected"));
  option.classList.add("is-selected");

  if (selectedSizeText) {
    selectedSizeText.textContent = option.dataset.label || "";
  }

  updateProductPricing();
}

function buildInternalCheckoutUrl() {
  const finalUrl = new URL("checkout.html", window.location.href);
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.forEach((value, key) => {
    finalUrl.searchParams.set(key, value);
  });

  finalUrl.searchParams.set("color", productState.color);
  finalUrl.searchParams.set("size", productState.size);
  return finalUrl.toString();
}

function goToCheckout() {
  window.location.href = buildInternalCheckoutUrl();
}

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function applyCpfMask(value) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function applyPhoneMask(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

function applyCepMask(value) {
  return onlyDigits(value).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

function setupCheckoutMasks() {
  inlineCheckout?.querySelector("[data-mask-cpf]")?.addEventListener("input", (event) => {
    event.target.value = applyCpfMask(event.target.value);
  });

  inlineCheckout?.querySelector("[data-mask-phone]")?.addEventListener("input", (event) => {
    event.target.value = applyPhoneMask(event.target.value);
  });

  inlineCheckout?.querySelector("[data-mask-cep]")?.addEventListener("input", (event) => {
    event.target.value = applyCepMask(event.target.value);
  });
}

async function fetchAddressByCep(zipcodeField) {
  const digits = onlyDigits(zipcodeField.value);

  if (digits.length !== 8) {
    return;
  }

  zipcodeField.setCustomValidity("");
  zipcodeField.classList.add("is-loading");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);

    if (!response.ok) {
      throw new Error("CEP indisponivel");
    }

    const address = await response.json();

    if (address.erro) {
      zipcodeField.setCustomValidity("CEP nao encontrado.");
      zipcodeField.reportValidity();
      return;
    }

    const addressField = getCheckoutField("address");
    const neighborhoodField = getCheckoutField("neighborhood");
    const cityField = getCheckoutField("city");
    const stateField = getCheckoutField("state");
    const numberField = getCheckoutField("number");

    if (addressField && address.logradouro) {
      addressField.value = address.logradouro;
    }

    if (neighborhoodField && address.bairro) {
      neighborhoodField.value = address.bairro;
    }

    if (cityField && address.localidade) {
      cityField.value = address.localidade;
    }

    if (stateField && address.uf) {
      stateField.value = address.uf;
    }

    numberField?.focus();
  } catch (error) {
    zipcodeField.setCustomValidity("Nao foi possivel buscar o CEP agora.");
    zipcodeField.reportValidity();
  } finally {
    zipcodeField.classList.remove("is-loading");
  }
}

function setupCepLookup() {
  const zipcodeField = getCheckoutField("zipcode");

  if (!zipcodeField) {
    return;
  }

  zipcodeField.addEventListener("input", () => {
    zipcodeField.setCustomValidity("");

    if (onlyDigits(zipcodeField.value).length === 8) {
      fetchAddressByCep(zipcodeField);
    }
  });

  zipcodeField.addEventListener("blur", () => fetchAddressByCep(zipcodeField));
}

function setupCheckoutPageState() {
  const params = new URLSearchParams(window.location.search);
  const color = params.get("color");
  const size = params.get("size");

  if (color && productCatalog[color]) {
    productState.color = color;
    productState.colorLabel = productCatalog[color].label;
    productState.image = productCatalog[color].image;
  }

  if (size && sizeCatalog[size]) {
    productState.size = size;
    productState.sizeLabel = sizeCatalog[size].label;
    productState.price = sizeCatalog[size].price;
  }

  if (checkoutImage) {
    checkoutImage.src = productState.image;
  }
}

function setCheckoutStep(step) {
  if (!checkoutPanels.length) {
    return;
  }

  checkoutPanels.forEach((panel) => {
    const isActive = Number(panel.dataset.checkoutPanel) === step;
    panel.classList.toggle("is-active", isActive);
    panel.toggleAttribute("hidden", !isActive);
  });

  checkoutStepItems.forEach((item) => {
    const itemStep = Number(item.dataset.checkoutStepItem);
    item.classList.toggle("is-active", itemStep === step);
    item.classList.toggle("is-complete", itemStep < step);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getCheckoutField(name) {
  return inlineCheckout?.elements?.[name] || null;
}

function validateCheckoutFields(names) {
  for (const name of names) {
    const field = getCheckoutField(name);

    if (field && !field.reportValidity()) {
      return false;
    }
  }

  return true;
}

function updateAddressCard() {
  const address = getCheckoutField("address")?.value.trim();
  const number = getCheckoutField("number")?.value.trim();
  const neighborhood = getCheckoutField("neighborhood")?.value.trim();
  const city = getCheckoutField("city")?.value.trim();
  const state = getCheckoutField("state")?.value.trim().toUpperCase();
  const zipcode = getCheckoutField("zipcode")?.value.trim();

  if (!checkoutAddressText || !checkoutAddressCard || !address || !number) {
    return;
  }

  checkoutAddressText.innerHTML = `
    <strong>${address}, ${number} - ${neighborhood}</strong>
    <span>${city} - ${state} | CEP ${zipcode}</span>
  `;
  checkoutAddressCard.hidden = false;
}

function getSelectedShipping() {
  const selected = inlineCheckout?.querySelector("[name='shipping_method']:checked");
  const price = Number(selected?.dataset.shippingPrice || 0);
  const option = selected?.closest(".shipping-option");
  const label = option?.querySelector("strong")?.textContent || "Correios";

  return {
    label,
    price: Number.isFinite(price) ? price : 0,
  };
}

function updateShippingPricing() {
  const shipping = getSelectedShipping();
  productState.shipping = shipping.price;
  productState.shippingLabel = shipping.price > 0 ? shipping.label : "Gratis";
  updateProductPricing();
}

function setupShippingOptions() {
  checkoutShippingRadios.forEach((radio) => {
    radio.addEventListener("change", updateShippingPricing);
  });

  updateShippingPricing();
}

function getStoredAttribution() {
  const fallbackParams =
    typeof window.getUtmifyGambiarraParams === "function"
      ? window.getUtmifyGambiarraParams()
      : {};
  const storageKeys = ["urlParams", "imperialTrackingParams", "premium-utmify-attribution"];
  const savedParams = {};

  storageKeys.forEach((key) => {
    try {
      const raw = window.localStorage.getItem(key);
      Object.assign(savedParams, raw ? JSON.parse(raw) : {});
    } catch (error) {}
  });

  return {
    ...(fallbackParams || {}),
    ...savedParams,
  };
}

function setupCheckoutSteps() {
  if (!inlineCheckout || !checkoutPanels.length) {
    return;
  }

  checkoutNextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextStep = Number(button.dataset.checkoutNext);

      if (nextStep === 2 && !validateCheckoutFields(["name", "email", "document", "phone"])) {
        return;
      }

      if (nextStep === 3) {
        const validAddress = validateCheckoutFields([
          "zipcode",
          "address",
          "number",
          "neighborhood",
          "city",
          "state",
        ]);

        if (!validAddress) {
          return;
        }

        updateAddressCard();
        trackAddPaymentInfo();
      }

      setCheckoutStep(nextStep);
    });
  });

  checkoutBackButtons.forEach((button) => {
    button.addEventListener("click", () => setCheckoutStep(Number(button.dataset.checkoutBack)));
  });

  checkoutSaveAddressButton?.addEventListener("click", () => {
    const validAddress = validateCheckoutFields([
      "zipcode",
      "address",
      "number",
      "neighborhood",
      "city",
      "state",
    ]);

    if (validAddress) {
      updateAddressCard();
    }
  });

  setCheckoutStep(1);
  trackInitiateCheckout();
}

function buildPixPayload(form) {
  const data = new FormData(form);
  const totals = getCheckoutTotals();
  const amount = totals.total;
  const productName = `Premium Edredom Termico 2 em 1 - ${productState.colorLabel} - ${productState.sizeLabel}`;
  const productId = `premium-edredom-${productState.color}-${productState.size}`;

  return {
    amount,
    customer: {
      fullName: data.get("name"),
      email: data.get("email"),
      document: onlyDigits(String(data.get("document") || "")),
      phone: onlyDigits(String(data.get("phone") || "")),
      address: {
        cep: data.get("zipcode"),
        street: data.get("address"),
        number: data.get("number"),
        neighborhood: data.get("neighborhood"),
        complement: data.get("complement"),
        city: data.get("city"),
        state: String(data.get("state") || "").toUpperCase(),
      },
    },
    items: [
      {
        id: productId,
        name: productName,
        quantity: 1,
        unitPrice: amount,
        totalPrice: amount,
      },
    ],
    attribution: getStoredAttribution(),
    summary: {
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      shippingLabel: productState.shippingLabel,
      total: totals.total,
      image: productState.image,
    },
  };
}

function getPixTransactionId(data) {
  return (
    data?.transactionId ||
    data?.id ||
    data?.saleId ||
    data?.sale_id ||
    data?.paymentId ||
    data?.payment_id ||
    ""
  );
}

function savePendingOrder(transactionId, payload, status = "pending") {
  if (!transactionId || !payload?.items?.[0]) {
    return;
  }

  const item = payload.items[0];
  const order = {
    transactionId,
    status,
    amount: payload.amount,
    product: {
      id: item.id,
      name: item.name,
      quantity: item.quantity || 1,
      image: payload.summary?.image || productState.image,
      variant: `${productState.colorLabel} - ${productState.sizeLabel}`,
    },
    summary: payload.summary || getCheckoutTotals(),
    createdAt: new Date().toISOString(),
  };

  try {
    window.sessionStorage.setItem(`premiumPendingOrder:${transactionId}`, JSON.stringify(order));
    window.sessionStorage.setItem("premiumLastOrder", JSON.stringify(order));
  } catch (error) {}
}

function savePaidOrder(transactionId, payload, status = "paid") {
  if (!transactionId) {
    return;
  }

  try {
    const raw = window.sessionStorage.getItem(`premiumPendingOrder:${transactionId}`);
    const order = raw ? JSON.parse(raw) : {};
    const paidOrder = {
      ...order,
      transactionId,
      status,
      amount: payload?.amount || order.amount || getCheckoutTotals().total,
      paidAt: new Date().toISOString(),
    };

    window.sessionStorage.setItem(`premiumPaidOrder:${transactionId}`, JSON.stringify(paidOrder));
    window.sessionStorage.setItem("premiumLastOrder", JSON.stringify(paidOrder));
  } catch (error) {}
}

function redirectToThankYou(transactionId, payload, status = "paid") {
  savePaidOrder(transactionId, payload, status);

  const item = payload?.items?.[0] || {};
  const params = new URLSearchParams({
    transactionId: transactionId || "",
    value: String(payload?.amount || getCheckoutTotals().total),
    content_id: item.id || getTrackingProduct().id,
    content_name: item.name || getTrackingProduct().name,
    status,
  });

  window.location.href = `obrigado.html?${params.toString()}`;
}

function isPaidPixStatus(data) {
  const status = String(data?.status || data?.paymentStatus || "").toLowerCase();
  return paidPixStatuses.includes(status) || Boolean(data?.paidAt || data?.paid_at);
}

function pollPixStatus(transactionId, payload) {
  if (!transactionId) {
    return;
  }

  let attempts = 0;
  const timer = window.setInterval(async () => {
    attempts += 1;

    if (attempts > 90) {
      window.clearInterval(timer);
      return;
    }

    try {
      const response = await fetch(`/api/pix/status?transactionId=${encodeURIComponent(transactionId)}`);
      const data = await response.json();

      if (isPaidPixStatus(data)) {
        window.clearInterval(timer);
        redirectToThankYou(transactionId, payload, data.status || "paid");
      }
    } catch (error) {}
  }, 5000);
}

function renderPixResult(data) {
  if (!pixResult) {
    return;
  }

  const qrCode = data.qrCode || data.qr_code_base64 || data.qrCodeBase64;
  const pixCode =
    data.copyAndPaste ||
    data.copyPaste ||
    data.pix_code ||
    data.pixCode ||
    data.copy_paste ||
    "";

  pixResult.classList.add("is-open");

  if (qrCode || pixCode) {
    pixResult.innerHTML = `
      ${qrCode ? `<img src="${qrCode.startsWith("data:") ? qrCode : `data:image/png;base64,${qrCode}`}" alt="QR Code Pix" />` : ""}
      ${pixCode ? `<label>Pix copia e cola<textarea readonly>${pixCode}</textarea></label>` : ""}
      <p>Pedido criado. Apos o pagamento, a confirmacao sera enviada por e-mail.</p>
    `;
    return;
  }

  pixResult.innerHTML = "<p>Pedido recebido. Gere o Pix pela sua API para exibir o QR Code aqui.</p>";
}

async function submitInlineCheckout(event) {
  event.preventDefault();

  if (!inlineCheckout?.reportValidity()) {
    return;
  }

  const payload = buildPixPayload(inlineCheckout);
  trackAddPaymentInfo();

  checkoutFinishButton?.setAttribute("disabled", "true");
  if (pixResult) {
    pixResult.classList.add("is-open");
    pixResult.innerHTML = "<p>Gerando Pix...</p>";
  }

  try {
    const data = await createPixWithFallback(payload);
    const transactionId = getPixTransactionId(data);

    savePendingOrder(transactionId, payload, data.status || "pending");
    renderPixResult(data);

    if (isPaidPixStatus(data)) {
      redirectToThankYou(transactionId, payload, data.status || "paid");
      return;
    }

    pollPixStatus(transactionId, payload);
  } catch (error) {
    if (pixResult) {
      pixResult.classList.add("is-open");
      pixResult.innerHTML = `
        <p>Nao foi possivel gerar o Pix automaticamente agora.</p>
        <p>Confira a configuracao da sua API Pix e tente novamente.</p>
      `;
    }
  } finally {
    checkoutFinishButton?.removeAttribute("disabled");
  }
}

async function requestPix(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  return { response, data };
}

async function createPixWithFallback(payload) {
  const endpoints = [window.PIX_CHECKOUT_ENDPOINT || "/api/pix/create", "/api/pix/checkout"];
  let lastMessage = "Nao foi possivel gerar o Pix agora.";

  for (const endpoint of endpoints) {
    try {
      const { response, data } = await requestPix(endpoint, payload);

      if (response.ok) {
        return data;
      }

      lastMessage = data?.message || data?.details?.message || data?.details?.error || lastMessage;
    } catch (error) {
      lastMessage = error instanceof Error ? error.message : "Falha ao conectar com o Pix.";
    }
  }

  throw new Error(lastMessage);
}

function setupImageFallbacks(scope = document) {
  const images = scope.querySelectorAll("img");

  images.forEach((image) => {
    if (image.dataset.fallbackReady) {
      return;
    }

    image.dataset.fallbackReady = "true";

    const markMissing = () => {
      image.classList.add("is-missing");
      image.parentElement?.classList.add("has-missing");
      image.removeAttribute("src");
    };

    image.addEventListener("load", () => {
      image.classList.remove("is-missing");
      image.parentElement?.classList.remove("has-missing");
    });

    image.addEventListener("error", markMissing);

    if (image.complete && image.naturalWidth === 0) {
      markMissing();
    }
  });
}

function getReviewsForPage(page) {
  const userReviews = submittedReviews.filter((review) => review.page === page);
  const baseReviews = reviews.filter((review) => review.page === page);

  return [...userReviews, ...baseReviews].slice(0, 6);
}

function createReviewCard(review) {
  const imageMarkup = review.image
    ? `<button class="review-image-button" type="button" data-review-image="${escapeHtml(review.image)}">
        <img src="${escapeHtml(review.image)}" alt="Foto enviada por ${escapeHtml(review.name)}" />
      </button>`
    : "";

  return `
    <article class="review-card">
      <div class="review-card__header">
        <span class="review-avatar">${escapeHtml(review.initials)}</span>
        <div class="review-author">
          <strong>${escapeHtml(review.name)}</strong>
          <span class="review-verified">Verificado</span>
        </div>
      </div>
      <div class="review-stars" aria-label="${review.rating} estrelas">★★★★★</div>
      <p class="review-comment">${escapeHtml(review.comment)}</p>
      ${imageMarkup}
    </article>
  `;
}

function renderReviews(page = currentReviewPage, shouldScroll = false) {
  if (!reviewsList) {
    return;
  }

  currentReviewPage = page;
  reviewsList.innerHTML = getReviewsForPage(page).map(createReviewCard).join("");
  setupImageFallbacks(reviewsList);

  reviewsList.querySelectorAll("[data-review-image]").forEach((button) => {
    button.addEventListener("click", () => openReviewLightbox(button.dataset.reviewImage));
  });

  renderPagination();

  if (shouldScroll) {
    reviewsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderPagination() {
  if (!reviewsPagination) {
    return;
  }

  const totalPages = 3;
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button type="button" class="${page === currentReviewPage ? "is-active" : ""}" data-review-page="${page}">${page}</button>`;
  }).join("");

  reviewsPagination.innerHTML = `
    <button type="button" data-review-prev ${currentReviewPage === 1 ? "disabled" : ""}>«</button>
    ${pageButtons}
    <button type="button" data-review-next ${currentReviewPage === totalPages ? "disabled" : ""}>»</button>
  `;

  reviewsPagination.querySelectorAll("[data-review-page]").forEach((button) => {
    button.addEventListener("click", () => renderReviews(Number(button.dataset.reviewPage), true));
  });

  reviewsPagination.querySelector("[data-review-prev]")?.addEventListener("click", () => {
    renderReviews(Math.max(1, currentReviewPage - 1), true);
  });

  reviewsPagination.querySelector("[data-review-next]")?.addEventListener("click", () => {
    renderReviews(Math.min(totalPages, currentReviewPage + 1), true);
  });
}

function toggleReviewForm() {
  if (!reviewForm) {
    return;
  }

  const isOpen = reviewForm.classList.toggle("is-open");
  reviewForm.setAttribute("aria-hidden", String(!isOpen));
}

function submitReviewForm(event) {
  event.preventDefault();

  if (!reviewForm) {
    return;
  }

  const formData = new FormData(reviewForm);
  const name = String(formData.get("name") || "").trim();
  const comment = String(formData.get("comment") || "").trim();

  if (!name || !comment) {
    if (reviewMessage) {
      reviewMessage.textContent = "Preencha seu nome e comentário para enviar.";
      reviewMessage.classList.add("is-error");
    }
    return;
  }

  submittedReviews.unshift({
    name,
    initials: getInitials(name),
    rating: 5,
    page: currentReviewPage,
    comment,
  });

  reviewForm.reset();

  if (reviewMessage) {
    reviewMessage.textContent = "Sua avaliação foi enviada com sucesso.";
    reviewMessage.classList.remove("is-error");
  }

  renderReviews(currentReviewPage);
}

function openReviewLightbox(src) {
  if (!reviewLightbox || !reviewLightboxImage || !src) {
    return;
  }

  reviewLightboxImage.src = src;
  reviewLightbox.classList.add("is-open");
  reviewLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("review-lightbox-open");
}

function closeReviewLightbox() {
  if (!reviewLightbox) {
    return;
  }

  reviewLightbox.classList.remove("is-open");
  reviewLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("review-lightbox-open");
}

function setupFooterAccordions() {
  footerAccordions.forEach((accordion) => {
    const button = accordion.querySelector("[data-footer-accordion-button]");
    const content = accordion.querySelector("[data-footer-accordion-content]");

    if (!button || !content) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = accordion.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : "0px";
    });
  });
}

function setActiveBenefit(index) {
  const safeIndex = Math.max(0, Math.min(index, benefitSteps.length - 1));

  benefitSteps.forEach((step, stepIndex) => {
    step.classList.toggle("is-active", stepIndex === safeIndex);
  });

  benefitDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === safeIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function setupColorRibbon() {
  if (!colorRibbonTrack) {
    return;
  }

  const pauseRibbon = () => colorRibbonTrack.classList.add("is-paused");
  const resumeRibbon = () => {
    window.setTimeout(() => colorRibbonTrack.classList.remove("is-paused"), 900);
  };

  colorRibbonTrack.addEventListener("pointerdown", pauseRibbon);
  colorRibbonTrack.addEventListener("pointerup", resumeRibbon);
  colorRibbonTrack.addEventListener("pointercancel", resumeRibbon);
  colorRibbonTrack.addEventListener("touchend", resumeRibbon);
}

function setupBenefitsStory() {
  if (!benefitsStory || !benefitsCarousel || !benefitSteps.length) {
    return;
  }

  const cards = Array.from(benefitSteps);
  const dots = Array.from(benefitDots);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let benefitIndex = 0;
  let benefitsVisible = false;
  let userInteracting = false;
  let scrollRaf = null;
  let restartTimeout = null;

  const hasHorizontalOverflow = () => benefitsCarousel.scrollWidth > benefitsCarousel.clientWidth + 4;

  const getActiveBenefitIndex = () => {
    const firstCard = cards[0];

    if (!firstCard) {
      return 0;
    }

    const gap = parseFloat(window.getComputedStyle(benefitsCarousel).gap || "0") || 0;
    const stepSize = firstCard.offsetWidth + gap;
    const rawIndex = stepSize > 0 ? Math.round(benefitsCarousel.scrollLeft / stepSize) : 0;

    return Math.max(0, Math.min(rawIndex, cards.length - 1));
  };

  const stopAutoScroll = () => {
    window.clearInterval(benefitsAutoScroll);
    benefitsAutoScroll = null;
  };

  const clearRestartTimer = () => {
    window.clearTimeout(restartTimeout);
    restartTimeout = null;
  };

  const goToBenefit = (index) => {
    if (!cards.length || !hasHorizontalOverflow()) {
      return;
    }

    const safeIndex = ((index % cards.length) + cards.length) % cards.length;
    const targetLeft = cards[safeIndex].offsetLeft - cards[0].offsetLeft;

    benefitsCarousel.scrollTo({
      left: Math.max(targetLeft, 0),
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });

    benefitIndex = safeIndex;
    setActiveBenefit(safeIndex);
  };

  const startAutoScroll = () => {
    if (prefersReducedMotion.matches || benefitsAutoScroll || !benefitsVisible || !hasHorizontalOverflow()) {
      return;
    }

    benefitsAutoScroll = window.setInterval(() => {
      if (!benefitsVisible || userInteracting) {
        return;
      }

      goToBenefit(benefitIndex + 1);
    }, 3500);
  };

  const restartAutoScrollSoon = () => {
    clearRestartTimer();

    if (!benefitsVisible) {
      return;
    }

    restartTimeout = window.setTimeout(startAutoScroll, 1600);
  };

  const endUserInteraction = () => {
    userInteracting = false;
    benefitIndex = getActiveBenefitIndex();
    setActiveBenefit(benefitIndex);
    restartAutoScrollSoon();
  };

  benefitsCarousel.addEventListener(
    "scroll",
    () => {
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
      }

      scrollRaf = window.requestAnimationFrame(() => {
        benefitIndex = getActiveBenefitIndex();
        setActiveBenefit(benefitIndex);
        scrollRaf = null;
      });
    },
    { passive: true }
  );

  benefitsCarousel.addEventListener("pointerdown", () => {
    userInteracting = true;
    clearRestartTimer();
    stopAutoScroll();
  });
  benefitsCarousel.addEventListener(
    "touchstart",
    () => {
      userInteracting = true;
      clearRestartTimer();
      stopAutoScroll();
    },
    { passive: true }
  );
  benefitsCarousel.addEventListener("pointerup", endUserInteraction);
  benefitsCarousel.addEventListener("pointercancel", endUserInteraction);
  benefitsCarousel.addEventListener("touchend", endUserInteraction, { passive: true });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", (event) => {
      event.preventDefault();
      userInteracting = true;
      clearRestartTimer();
      stopAutoScroll();
      goToBenefit(index);

      restartTimeout = window.setTimeout(() => {
        userInteracting = false;
        if (benefitsVisible) {
          startAutoScroll();
        }
      }, 1600);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          benefitsVisible = entry.isIntersecting;

          if (benefitsVisible) {
            benefitIndex = getActiveBenefitIndex();
            setActiveBenefit(benefitIndex);
            startAutoScroll();
          } else {
            clearRestartTimer();
            stopAutoScroll();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(benefitsStory);
  } else {
    benefitsVisible = true;
    startAutoScroll();
  }

  setActiveBenefit(0);
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (!faqItems.length) {
    return;
  }

  const closeItem = (item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");

    if (answer) {
      answer.style.maxHeight = "0px";
    }
  };

  const openItem = (item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.add("is-open");
    button?.setAttribute("aria-expanded", "true");

    if (answer) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  };

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
      return;
    }

    if (item.classList.contains("is-open")) {
      openItem(item);
    } else {
      closeItem(item);
    }

    button.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");

      faqItems.forEach(closeItem);

      if (!wasOpen) {
        openItem(item);
      }
    });
  });

  window.addEventListener("resize", () => {
    faqItems.forEach((item) => {
      if (item.classList.contains("is-open")) {
        openItem(item);
      }
    });
  });
}

function initTrustSlider() {
  const slider = document.querySelector("[data-trust-slider]");

  if (!slider) {
    return;
  }

  const slides = Array.from(slider.querySelectorAll("[data-trust-slide]"));
  const dots = Array.from(slider.querySelectorAll("[data-trust-dot]"));

  if (!slides.length || !dots.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const section = slider.closest(".trust-slider-section");
  let current = 0;
  let timer = null;
  let restartTimer = null;
  let isVisible = !("IntersectionObserver" in window);

  const showSlide = (index) => {
    current = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === current);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === current;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    if (timer || prefersReducedMotion.matches || !isVisible) {
      return;
    }

    timer = window.setInterval(() => {
      if (isVisible) {
        showSlide(current + 1);
      }
    }, 3200);
  };

  const restartSoon = () => {
    window.clearTimeout(restartTimer);
    restartTimer = window.setTimeout(start, 2500);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", (event) => {
      event.preventDefault();
      stop();
      showSlide(index);
      restartSoon();
    });
  });

  if ("IntersectionObserver" in window && section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;

          if (isVisible) {
            start();
          } else {
            window.clearTimeout(restartTimer);
            stop();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
  } else {
    start();
  }

  showSlide(0);
}

menuOpenButton?.addEventListener("click", openMenu);

menuCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeLightbox();
    closeReviewLightbox();
  }
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", handleSmoothScroll);
});

galleryThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    updateMainImage(thumb.dataset.image, thumb);
  });
});

colorOptions.forEach((option) => {
  option.addEventListener("click", () => selectColor(option));
});

colorJumpLinks.forEach((link) => {
  link.addEventListener(
    "click",
    () => {
      const color = link.dataset.selectColor;
      const option = document.querySelector(`[data-color-option][data-color="${color}"]`);

      if (option) {
        selectColor(option);
      }
    },
    { capture: true }
  );
});

sizeOptions.forEach((option) => {
  option.addEventListener("click", () => selectSize(option));
});

lightboxOpenButton?.addEventListener("pointerdown", handleMainGalleryPointerDown);
lightboxOpenButton?.addEventListener("pointerup", handleMainGalleryPointerUp);

lightboxOpenButton?.addEventListener("click", (event) => {
  if (mainGalleryDidSwipe) {
    event.preventDefault();
    mainGalleryDidSwipe = false;
    return;
  }

  openLightbox();
});
lightboxCloseButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

checkoutButton?.addEventListener("click", goToCheckout);
inlineCheckout?.addEventListener("submit", submitInlineCheckout);
reviewToggleButton?.addEventListener("click", toggleReviewForm);
reviewForm?.addEventListener("submit", submitReviewForm);
reviewLightboxClose?.addEventListener("click", closeReviewLightbox);

reviewLightbox?.addEventListener("click", (event) => {
  if (event.target === reviewLightbox) {
    closeReviewLightbox();
  }
});

setupCheckoutPageState();
setupImageFallbacks();
setupCheckoutMasks();
setupCepLookup();
setupShippingOptions();
setupCheckoutSteps();
setupColorRibbon();
setupBenefitsStory();
initFaqAccordion();
initTrustSlider();
setupFooterAccordions();
setupRevealAnimations();
updateProductPricing();
renderReviews();

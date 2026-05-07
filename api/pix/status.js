const { getPixStatus } = require("../../server/pix.js");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Metodo nao permitido." }));
    return;
  }

  try {
    const url = new URL(req.url || "", "http://localhost");
    const transactionId = url.searchParams.get("transactionId");
    const result = await getPixStatus(transactionId);
    res.statusCode = result.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.body));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Nao foi possivel consultar o status do Pix.",
        details: error instanceof Error ? error.message : String(error),
      }),
    );
  }
};

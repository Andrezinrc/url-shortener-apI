const Url = require('../models/Url');
const { generateShortCode } = require('../services/urlService');

// Cria uma URL encurtada com base na original enviada no body
async function shortenUrl(req, res) {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'URL obrigatória.' });

  const shortCode = generateShortCode();

  const newUrl = new Url({ originalUrl, shortCode });
  await newUrl.save();

  // Retorna a URL encurtada baseada no host da requisição
  res.json({ shortUrl: `${req.headers.host}/${shortCode}` });
}

// Redireciona para a URL original com base no código encurtado
async function redirectToOriginal(req, res) {
  const { code } = req.params;

  const url = await Url.findOne({ shortCode: code });

  if (!url) return res.status(404).json({ error: 'URL não encontrada.' });

  res.redirect(url.originalUrl);
}

module.exports = { shortenUrl, redirectToOriginal };

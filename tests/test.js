const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function shortenUrl(originalUrl) {
  try {
    const res = await axios.post(`${BASE_URL}/shorten`, { originalUrl });
    console.log('URL encurtada:', res.data.shortUrl);
    return res.data.shortUrl;
  } catch (err) {
    console.error('Erro ao encurtar:', err.response?.data || err.message);
  }
}

async function checkRedirect(code) {
  try {
    const res = await axios.get(`${BASE_URL}/${code}`, {
      maxRedirects: 0,
      validateStatus: (status) => status < 400 || status === 302,
    });
    console.log('Redirecionamento para:', res.headers.location);
  } catch (err) {
    console.error('Erro no redirecionamento:', err.response?.data || err.message);
  }
}

// Rodar os testes
(async () => {
  const shortUrl = await shortenUrl('https://www.google.com');

  if (shortUrl) {
    const code = shortUrl.split('/').pop();
    await checkRedirect(code);
  }
})();

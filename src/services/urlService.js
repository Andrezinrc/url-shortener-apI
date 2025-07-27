const crypto = require('crypto');

// Gera um código curto aleatório com base em bytes criptográficos
// Utiliza o formato base64url para garantir que os caracteres sejam seguros em URLs
// A função corta o resultado para o tamanho desejado
function generateShortCode(length = 6) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}

module.exports = { generateShortCode };

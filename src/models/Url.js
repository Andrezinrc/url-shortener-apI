const mongoose = require('mongoose');

// Este schema define o modelo para armazenar URLs originais junto com seus shortCodes gerados,
// permitindo o encurtamento e redirecionamento de URLs na aplicação.
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Url', urlSchema);

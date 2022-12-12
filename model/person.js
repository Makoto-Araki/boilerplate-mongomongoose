let mongoose = require('mongoose');

// スキーマ定義
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

// スキーマをモデルとしてエクスポート
module.exports = mongoose.model('Person', personSchema)
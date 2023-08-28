// models/menuItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  requiredRoles: [{ type: Schema.Types.ObjectId, ref: 'Role' }] // 권한 정보와 연결
});

module.exports = mongoose.model('MenuItem', menuItemSchema);

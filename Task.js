 const mongoose = require('mongoose');

// // تصميم النموذج
 const taskSchema = new mongoose.Schema({
     title: { type: String, required: true },
     description: { type: String },
     status: { type: String, default: 'Pending' },
     createdAt: { type: Date, default: Date.now },
 });

// // إنشاء النموذج
 module.exports = mongoose.model('Task', taskSchema);

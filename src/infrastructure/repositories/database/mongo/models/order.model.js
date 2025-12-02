const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product:      { type: String, required: true, trim: true },
    description:  { type: String, required: true },
    quantity:     { type: Number, required: true, min: 1 },
    price:        { type: Number, required: true, min: 0 },
    discount:     { type: Number, required: true, min: 0, default: 0 },
    total:        { type: Number, required: true, min: 0 },
    status:       { type: String, enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

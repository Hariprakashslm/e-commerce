const Product = require('../models/product.model');

exports.createProduct = (data) => Product.create(data);

exports.getAllProducts = () => Product.find();

exports.getProductById = (id) => Product.findById(id);

exports.updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });

exports.deleteProduct = (id) => Product.findByIdAndDelete(id);

exports.updateStock = (id, qty) =>
  Product.findByIdAndUpdate(id, { stock: qty }, { new: true });

exports.searchProducts = (q) =>
  Product.find({ name: { $regex: q, $options: 'i' } });

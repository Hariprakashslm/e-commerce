const Product = require("../models/product.model");

const create = (data) => Product.create(data);

const findById = (id) => Product.findById(id);

const findAll = (filter = {}) => Product.find(filter);

const updateById = (id, update) =>
  Product.findByIdAndUpdate(id, update, { new: true });

const decrementStock = (id, qty) =>
  Product.findOneAndUpdate(
    { _id: id, stock: { $gte: qty } },
    { $inc: { stock: -qty } },
    { new: true }
  );

module.exports = {
  create,
  findById,
  findAll,
  updateById,
  decrementStock,
};

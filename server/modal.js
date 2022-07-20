const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  percentage_off: {
    type: Number,
    required: true,
  },
});

const OrdersSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  is_delivered: {
    type: Boolean,
    default: false,
  },
});

const TransactionsSchema = mongoose.Schema({
  transaction_date: {
    type: String,
    require: true,
  },
  transaction_image_url: {
    type: String,
    require: true,
  },
  user_id: {
    type: String,
    require: true,
  },
  transaction_status: {
    type: String,
    default: "PENDING",
  },
  address: {
    type: String,
    require: true,
  },
  phone_number: {
    type: String,
    require: true,
  },
  order_ids: {
    type: Array,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
});

module.exports.UserModal = mongoose.model("users", UserSchema);
module.exports.ProductModal = mongoose.model("products", ProductSchema);
module.exports.OrderModal = mongoose.model("orders", OrdersSchema);
module.exports.TransactionModal = mongoose.model(
  "transactions",
  TransactionsSchema
);

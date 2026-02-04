const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Blog Schema
 * ساختار بلاگ‌ها در دیتابیس
 */
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt و updatedAt
);

module.exports = mongoose.model("Blog", blogSchema);

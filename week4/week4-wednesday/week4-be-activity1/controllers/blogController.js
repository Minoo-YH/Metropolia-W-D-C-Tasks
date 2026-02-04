const Blog = require("../models/blogModel");

/**
 * GET /api/blogs
 * گرفتن همه بلاگ‌ها
 */
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

/**
 * GET /api/blogs/:id
 * گرفتن یک بلاگ با ID
 */
const getBlogById = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json(blog);
};

/**
 * POST /api/blogs
 * ساخت بلاگ جدید
 */
const createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body });
  res.status(201).json(blog);
};

/**
 * DELETE /api/blogs/:id
 */
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json(blog);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
};

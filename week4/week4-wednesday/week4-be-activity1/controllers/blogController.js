const Blog = require("../models/blogModel");
const mongoose = require("mongoose");


/**
 * GET /api/blogs
 * گرفتن همه بلاگ‌ها
 */
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};


/**
 * GET /api/blogs/:id
 * گرفتن یک بلاگ با ID
 */
const getBlogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};


/**
 * POST /api/blogs
 * ساخت بلاگ جدید
 */
// POST /api/blogs
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body });
    res.status(201).json(blog);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "Invalid input",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Failed to create blog" });
    }
  }
};


/**
 * DELETE /api/blogs/:id
 */
// DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};


// PUT /api/blogs/:id
const replaceBlog = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findOneAndReplace(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to replace blog" });
  }
};


module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  replaceBlog,
};

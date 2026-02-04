const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  replaceBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", replaceBlog);


module.exports = router;

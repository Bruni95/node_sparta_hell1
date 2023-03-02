const express = require("express");
const router = express.Router();

const Post = require("../schemas/post.js");
const Comment = require("../schemas/comment.js");

router.get("/post", async (req, res) => {
  const posts = await Post.find({}).sort({ date: -1 });
  const commentIds = posts.map((post) => post.commentId);

  const comments = await Comment.find({ commentId: { $in: commentIds } });

  const results = posts.map((post) => {
    const comment = comments.find((item) => item.commentId === post.commentId);
    return {
      title: post.title,
      username: post.username,
      date: post.date,
      comment: comment ? comment.content : "",
    };
  });

  router.post("/post", async (req, res) => {
    const { title, username, password, content } = req.body;
      
    const post = new Post({ title, username, password, content });
    await post.save();
      
    res.json({
      message: "새로운 게시글이 작성되었습니다.",
      post,
    });
  });

  router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(400).json({ message: "게시글이 존재하지 않습니다." });
    }

    res.json({
      title: post.title,
      username: post.username,
      date: post.date,
      content: post.content,
    });
  });

  res.json({
    posts: results,
  });
});

router.patch("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password, title, content } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(400).json({ message: "해당하는 게시글이 없습니다." });
  }

  if (password !== post.password) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await Post.findByIdAndUpdate(postId, { title, content });

  const updatedPost = await Post.findById(postId);

  res.json({
    message: "게시글이 수정되었습니다.",
    post: updatedPost,
  });
});

router.delete("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(400).json({ message: "게시글을 찾을 수 없습니다." });
  }

  if (post.password !== password) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await post.deleteOne();

  res.json({
    message: "게시글이 삭제되었습니다.",
  });
});


  module.exports = router;
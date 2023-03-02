const express = require('express');
const router = express.Router();


  router.get("/post/:postId/comment", async (req, res) => {
    const { postId } = req.params;
  
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "잘못된 요청입니다. 게시글을 찾을 수 없습니다." });
    }
  
    const comments = await Comment.find({ postId })
      .sort({ date: -1 })
      .select("content username date");
  
    res.json({
      postId,
      comments,
    });
  });
  
  router.post("/post/:postId/comment", async (req, res) => {
    const { postId } = req.params;
    const { content, username } = req.body;
  
    if (!content) {
      return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
    }
  
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "해당 게시글을 찾을 수 없습니다." });
    }
  
    const comment = new Comment({ content, username, postId });
    await comment.save();
  
    res.json({
      message: "댓글이 성공적으로 등록되었습니다.",
      comment,
    });
  });

router.patch("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  
  if (!content) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  }

  
  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId }, 
    { content: newContent }, 
    { new: true } 
  );

  
  if (!comment) {
    return res.status(400).json({ message: "존재하지 않는 댓글입니다." });
  }

  res.json({
    message: "댓글이 수정되었습니다.",
    comment,
  });
});

router.delete("/comment/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "댓글이 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "에러가 발생하였습니다." });
  }
});


module.exports = router;

  




  

  
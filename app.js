const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");


app.use(express.json());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});



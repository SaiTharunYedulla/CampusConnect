const postModel = require("../models/postModel");

async function createPost(req, res) {
  const postId = await postModel.createPost({
    student_id: req.user.id,
    title: req.body.title,
    description: req.body.description,
    hashtags: req.body.hashtags,
    category: req.body.category,
  });

  const files = req.files || [];
  for (const file of files) {
    const type = file.mimetype.startsWith("image/")
      ? "image"
      : file.mimetype.startsWith("video/")
        ? "video"
        : "pdf";
    await postModel.addMedia(postId, { url: file.path, type });
  }

  return res.status(201).json({ id: postId });
}

async function feed(req, res) {
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);
  const rows = await postModel.getFeed(limit, offset);
  return res.json(rows);
}

async function mine(req, res) {
  const rows = await postModel.getStudentPosts(req.user.id);
  return res.json(rows);
}

async function update(req, res) {
  await postModel.updatePost(req.params.id, req.body);
  return res.json({ message: "Post updated" });
}

async function remove(req, res) {
  await postModel.deletePost(req.params.id);
  return res.json({ message: "Post deleted" });
}

async function upvote(req, res) {
  const status = await postModel.toggleUpvote(req.params.id, req.user.id);
  return res.json({ status });
}

async function trending(req, res) {
  const rows = await postModel.getTrending(Number(req.query.limit || 10));
  return res.json(rows);
}

module.exports = { createPost, feed, mine, update, remove, upvote, trending };

const db = require('../helpers/db.js')

exports.readPost = async (req, res) => {
  try {
    const posts = await db.post.findMany()
    return res.json({
      success: true,
      message: 'List of posts',
      results: posts
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.createPost = async (req, res) => {
  let { userId,
    description,
    latitude,
    longitude
  } = req.body
  try {
    const post = await db.post.create({
      data: {
        userId,
        description,
        latitude,
        longitude
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Create post success',
      results: post
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const posts = await db.post.findMany({
      where: {
        userId: {
          in: userId
        }
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Get Post Success',
      results: posts
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error: " + error.message
    });
  }
}

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params
    const post = await db.post.findFirst({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Get post success',
      results: post
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.editPost = async (req, res) => {
  try {
    const { id } = req.params
    let { userId,
      description,
      latitude,
      longitude
    } = req.body
    const post = await db.post.update({
      where: { id },
      data: {
        userId,
        description,
        latitude,
        longitude
      }
    })
    return res.status(200).json({
      success: true,
      message: 'Edit post success',
      results: post
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await db.post.delete({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Delete post success',
      results: post
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}
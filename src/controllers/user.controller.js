const jwt = require('jsonwebtoken');
const db = require('../helpers/db.js')

exports.readUser = async (req, res) => {
  try {
    const users = await db.user.findMany()
    return res.json({
      success: true,
      message: 'List of users',
      results: users
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.createUser = async (req, res) => {
  let { roleId = "45c8513d-6c24-4 870-b937-eafc5b20a20d",
    username,
    password,
    name,
    phone,
    city
  } = req.body
  // const token = jwt.sign();
  try {
    const user = await db.user.create({
      data: {
        roleId,
        username,
        password,
        name,
        phone,
        city
        // token
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Create user success',
      results: user
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await db.user.findFirst({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Get user success',
      results: user
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params
    let { 
      username,
      password,
      name,
      phone,
      city,
    } = req.body
    // const token = Math.random().toString(16).substring(2, 8)
    const user = await db.user.update({
      where: { id },
      data: {
        username,
        password,
        name,
        phone,
        city,
        // token
      }
    })
    return res.status(200).json({
      success: true,
      message: 'Edit user success',
      results: user
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await db.user.delete({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Delete user success',
      results: deletedUser
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}
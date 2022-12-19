const db = require('../helpers/db.js')

exports.readRole = async (req, res) => {
  try {
    const roles = await db.role.findMany()
    return res.json({
      success: true,
      message: 'List of roles',
      results: roles
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.createRole = async (req, res) => {
  try {
    let { name } = req.body
    const role = await db.role.create({
      data: { name }
    })

    return res.status(200).json({
      success: true,
      message: 'Create role success',
      results: role
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params
    const role = await db.role.findFirst({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Get role success',
      results: role
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.editRole = async (req, res) => {
  try {
    const { id } = req.params
    let { name } = req.body
    const role = await db.role.update({
      where: { id },
      data: { name }
    })
    return res.status(200).json({
      success: true,
      message: 'Edit role success',
      results: role
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params
    const role = await db.role.delete({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Delete role success',
      results: role
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}
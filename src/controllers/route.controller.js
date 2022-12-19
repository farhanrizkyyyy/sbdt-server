const db = require('../helpers/db.js')

exports.readRoute = async (req, res) => {
  try {
    const data = await db.route.findMany()
    return res.json({
      success: true,
      message: 'List of routes',
      results: data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
}

exports.createRoute = async (req, res) => {
  let { userId,
    from,
    to,
    route
  } = req.body
  try {
    const data = await db.route.create({
      data: { userId,
        from,
        to,
        route }
    })

    return res.status(200).json({
      success: true,
      message: 'Create route success',
      results: data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
}

exports.getRouteById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await db.route.findFirst({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Get route success',
      results: data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
}

exports.editRoute = async (req, res) => {
  try {
    const { id } = req.params
    let { userId,
      from,
      to,
      route
      } = req.body
    const data = await db.route.update({
      where: { id },
      data: { userId,
        from,
        to,
        route }
    })
    return res.status(200).json({
      success: true,
      message: 'Edit route success',
      results: data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
}

exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params
    const data =  await db.route.delete({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Delete route success',
      results: data
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: "+err.message
    });
  }
}
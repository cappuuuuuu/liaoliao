const express = require('express')
const router = express.Router()
const AvatarsModel = require('../models/avatars')

router.get('/', async (req, res) => {
  const avatars = await AvatarsModel.find()
  res.send(avatars)
})

module.exports = router

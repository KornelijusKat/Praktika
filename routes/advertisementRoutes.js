const express = require('express')
const advertController = require('../controllers/advertisementController')
const router = express.Router()

router
    .route("/")
    .get()
    .post(advertController.createAdvert)
module.exports = router;
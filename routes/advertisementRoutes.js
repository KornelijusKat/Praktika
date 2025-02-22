const express = require('express')
const advertController = require('../controllers/advertisementController')
const jwtAuth = require('../middleware/authmidware')

const router = express.Router()

router
    .route("/")
    .get(advertController.getAllAds)
    .post(jwtAuth.authenticateJWT,advertController.createAdvert)
router
    .route('/:id')
    .get(advertController.getAdById)
    .patch(jwtAuth.authenticateJWT, advertController.updateAd)
    .delete(jwtAuth.authenticateJWT, advertController.deleteAdvertByID)
router
    .route('/category/:categoryId')
module.exports = router;
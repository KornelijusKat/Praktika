const express = require('express')
const categoryController = require('../controllers/categoryController')
const jwtAuth = require('../middleware/authmidware')
const router = express.Router()

router
    .route("/")
    .get(categoryController.getCategories)
    .post(jwtAuth.authenticateJWT, categoryController.createCategory)
router
    .route('/:id/update')
    .patch(jwtAuth.authenticateJWT, categoryController.updateCategory)
module.exports = router;
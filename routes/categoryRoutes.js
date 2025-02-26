const express = require('express')
const categoryController = require('../controllers/categoryController')
const jwtAuth = require('../middleware/authmidware')
const router = express.Router()

router
    .route("/")
    .get(categoryController.getCategories)
    .post(jwtAuth.authenticateJWT, categoryController.createCategory)
router
    .route('/:id')
    .get(jwtAuth.authenticateJWT, categoryController.getCategoriesById)
router
    .route('/:id/update')
    .patch(jwtAuth.authenticateJWT, categoryController.updateCategory)
router
    .route('/:id/deleteCategory')
    .delete(jwtAuth.authenticateJWT,categoryController.deleteCategory)
module.exports = router;
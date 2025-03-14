const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router
    .route('/')
    .post(commentController.createComment);

router
    .route('/:advertId')
    .get(commentController.getCommentsByAd);

module.exports = router;
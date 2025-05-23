const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookController = require('../controllers/book.controller');
const reviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth.middleware');

// Book routes
router.post('/', auth, [
  body('title').trim().not().isEmpty(),
  body('author').trim().not().isEmpty(),
  body('genre').trim().not().isEmpty(),
  body('description').trim().not().isEmpty()
], bookController.createBook);

router.get('/', bookController.getBooks);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);

// Review routes
router.post('/:bookId/reviews', auth, [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').trim().not().isEmpty()
], reviewController.createReview);

router.get('/:bookId/reviews', reviewController.getBookReviews);
router.put('/reviews/:id', auth, [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').trim().not().isEmpty()
], reviewController.updateReview);

router.delete('/reviews/:id', auth, reviewController.deleteReview);

module.exports = router;

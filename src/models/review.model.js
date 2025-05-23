const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Ensure one review per user per book
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Update book's average rating when a review is added or modified
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Book = require('./book.model');
  
  const stats = await Review.aggregate([
    { $match: { book: this.book } },
    {
      $group: {
        _id: '$book',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  await Book.findByIdAndUpdate(this.book, {
    averageRating: stats[0]?.averageRating || 0,
    reviewCount: stats[0]?.count || 0
  });
});

module.exports = mongoose.model('Review', reviewSchema);

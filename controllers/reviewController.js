import ReviewModel from '../models/reviewModel.js';

// Create a new review
export const createReview = async (req, res) => {
    try {
        const reviewData = req.body;
        const newReview = new ReviewModel(reviewData);
        await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create review', error: error.message });
    }
};

// Get all reviews (optionally filter by productId)
export const getReviews = async (req, res) => {
    try {
        const { productId } = req.query;
        const filter = productId ? { productId } : {};
        const reviews = await ReviewModel.find(filter);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch review', error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const updatedReview = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated', review: updatedReview });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update review', error: error.message });
    }
};

// Hide or unhide a review
export const toggleReviewVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await ReviewModel.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.isHidden = !review.isHidden;
        await review.save();

        res.status(200).json({
            message: `Review ${review.isHidden ? 'hidden' : 'unhidden'} successfully`,
            review,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle review visibility', error: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted', review: deletedReview });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};

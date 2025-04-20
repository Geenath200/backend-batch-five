import express from 'express';
import {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    toggleReviewVisibility,
    deleteReview,
} from '../controllers/reviewController.js';

import { createOrder } from '../controllers/orderController.js'; // make sure this file exists

const router = express.Router();

// --- Review Routes ---
router.post('/reviews', createReview);
router.get('/reviews', getReviews);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', updateReview);
router.patch('/reviews/:id/toggle-visibility', toggleReviewVisibility);
router.delete('/reviews/:id', deleteReview);

// --- Order Route ---
router.post('/orders', createOrder);

export default router;

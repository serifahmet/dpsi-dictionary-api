import { Router } from 'express';
import { legalTermController } from '../controllers/legalTermController';

const router = Router();

router.get('/terms', legalTermController.getTerms);
router.get('/terms/search', legalTermController.searchTerms);
router.get('/terms/:id', legalTermController.getTerm);

export default router; 
import { Request, Response } from 'express';
import LegalTerm, { ILegalTerm } from '../models/LegalTerm';

export const legalTermController = {
  // Get all terms with pagination and sorting
  async getTerms(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = (req.query.sortBy as string) || 'englishTerm';
      const sortOrder = (req.query.sortOrder as string) === 'desc' ? -1 : 1;

      const terms = await LegalTerm.find()
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await LegalTerm.countDocuments();

      res.json({
        terms,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching terms' });
    }
  },

  // Enhanced search with pagination and filters
  async searchTerms(req: Request, res: Response) {
    try {
      const { query, context, partOfSpeech } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = (req.query.sortBy as string) || 'englishTerm';
      const sortOrder = (req.query.sortOrder as string) === 'desc' ? -1 : 1;

      let searchQuery: any = {};

      if (query) {
        searchQuery = {
          $or: [
            { englishTerm: new RegExp(String(query), 'i') },
            { turkishTerm: new RegExp(String(query), 'i') }
          ]
        };
      }

      if (context) {
        searchQuery.legalContext = context;
      }

      if (partOfSpeech) {
        searchQuery.partOfSpeech = partOfSpeech;
      }

      const terms = await LegalTerm.find(searchQuery)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await LegalTerm.countDocuments(searchQuery);

      res.json({
        terms,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error searching terms' });
    }
  },

  // Get term by ID
  async getTerm(req: Request, res: Response) {
    try {
      const term = await LegalTerm.findById(req.params.id);
      if (!term) {
        return res.status(404).json({ error: 'Term not found' });
      }
      res.json(term);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching term' });
    }
  },

  // Add a new term
  async addTerm(req: Request, res: Response) {
    try {
      const newTerm = new LegalTerm(req.body);
      await newTerm.validate(); // Validates the data against the schema
      await newTerm.save();
      res.status(201).json(newTerm);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error adding term' });
      }
    }
  },

  // Add bulk import functionality
  async bulkImport(req: Request, res: Response) {
    try {
      // Validate that request body is an array
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Request body must be an array of terms' });
      }

      // Validate each term in the array
      const terms = req.body.map(term => new LegalTerm(term));
      
      // Validate all terms before saving
      await Promise.all(terms.map(term => term.validate()));
      
      // Insert all terms
      const result = await LegalTerm.insertMany(terms, { ordered: false });
      
      res.status(201).json({
        message: 'Bulk import successful',
        count: result.length,
        terms: result
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ 
          error: 'Bulk import failed', 
          details: error.message 
        });
      } else {
        res.status(500).json({ error: 'Error during bulk import' });
      }
    }
  }
}; 
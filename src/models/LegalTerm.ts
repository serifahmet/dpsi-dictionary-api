import mongoose, { Schema, Document } from 'mongoose';

export interface ILegalTerm extends Document {
  englishTerm: string;
  turkishTerm: string;
  partOfSpeech: string;
  legalContext: string[];
  sampleSentences: {
    english: string;
    turkish: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const LegalTermSchema: Schema = new Schema({
  englishTerm: {
    type: String,
    required: true,
    index: true
  },
  turkishTerm: {
    type: String,
    required: true,
    index: true
  },
  partOfSpeech: {
    type: String,
    required: true,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'phrase']
  },
  legalContext: [{
    type: String,
    enum: ['family_law', 'criminal_law', 'financial_law', 'immigration_law', 'civil_law']
  }],
  sampleSentences: [{
    english: String,
    turkish: String
  }]
}, {
  timestamps: true
});

export default mongoose.model<ILegalTerm>('LegalTerm', LegalTermSchema); 
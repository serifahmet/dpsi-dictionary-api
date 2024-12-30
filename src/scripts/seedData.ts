import mongoose from 'mongoose';
import { config } from '../config';
import LegalTerm from '../models/LegalTerm';

const sampleTerms = [
  {
    englishTerm: "contract",
    turkishTerm: "sözleşme",
    partOfSpeech: "noun",
    legalContext: ["civil_law", "financial_law"],
    sampleSentences: [
      {
        english: "The parties entered into a binding contract.",
        turkish: "Taraflar bağlayıcı bir sözleşme imzaladılar."
      }
    ]
  },
  {
    englishTerm: "defendant",
    turkishTerm: "sanık",
    partOfSpeech: "noun",
    legalContext: ["criminal_law"],
    sampleSentences: [
      {
        english: "The defendant pleaded not guilty to all charges.",
        turkish: "Sanık tüm suçlamaları reddetti."
      }
    ]
  },
  {
    englishTerm: "custody",
    turkishTerm: "velayet",
    partOfSpeech: "noun",
    legalContext: ["family_law"],
    sampleSentences: [
      {
        english: "The court awarded joint custody to both parents.",
        turkish: "Mahkeme ortak velayeti her iki ebeveyne verdi."
      }
    ]
  },
  {
    englishTerm: "plaintiff",
    turkishTerm: "davacı",
    partOfSpeech: "noun",
    legalContext: ["civil_law", "criminal_law"],
    sampleSentences: [
      {
        english: "The plaintiff filed a lawsuit against the company.",
        turkish: "Davacı şirkete karşı dava açtı."
      }
    ]
  },
  {
    englishTerm: "injunction",
    turkishTerm: "ihtiyati tedbir",
    partOfSpeech: "noun",
    legalContext: ["civil_law"],
    sampleSentences: [
      {
        english: "The court granted a temporary injunction.",
        turkish: "Mahkeme geçici ihtiyati tedbir kararı verdi."
      }
    ]
  },
  {
    englishTerm: "prosecute",
    turkishTerm: "dava etmek",
    partOfSpeech: "verb",
    legalContext: ["criminal_law"],
    sampleSentences: [
      {
        english: "The state will prosecute the case.",
        turkish: "Devlet davayı açacak."
      }
    ]
  },
  {
    englishTerm: "appeal",
    turkishTerm: "temyiz",
    partOfSpeech: "noun",
    legalContext: ["civil_law", "criminal_law"],
    sampleSentences: [
      {
        english: "The defendant filed an appeal against the verdict.",
        turkish: "Sanık karara karşı temyiz başvurusunda bulundu."
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await LegalTerm.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await LegalTerm.insertMany(sampleTerms);
    console.log('Sample data inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 
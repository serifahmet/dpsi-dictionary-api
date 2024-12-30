import fs from 'fs';
import path from 'path';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/terms/bulk';

// Sample terms data file
const terms = [
  {
    englishTerm: "witness",
    turkishTerm: "tanık",
    partOfSpeech: "noun",
    legalContext: ["criminal_law", "civil_law"],
    sampleSentences: [
      {
        english: "The witness testified in court.",
        turkish: "Tanık mahkemede ifade verdi."
      }
    ]
  },
  {
    englishTerm: "evidence",
    turkishTerm: "delil",
    partOfSpeech: "noun",
    legalContext: ["criminal_law", "civil_law"],
    sampleSentences: [
      {
        english: "The prosecution presented new evidence.",
        turkish: "Savcılık yeni delil sundu."
      }
    ]
  }
  // Add more terms as needed
];

async function bulkImport() {
  try {
    const response = await axios.post(API_URL, terms);
    console.log('Bulk import successful:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Bulk import failed:', error.response?.data);
    } else {
      console.error('Error:', error);
    }
  }
}

bulkImport(); 
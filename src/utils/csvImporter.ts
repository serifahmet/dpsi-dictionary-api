import fs from 'fs';
import csv from 'csv-parse';
import { ILegalTerm } from '../models/LegalTerm';

export async function importFromCsv(filePath: string): Promise<Partial<ILegalTerm>[]> {
  return new Promise((resolve, reject) => {
    const terms: Partial<ILegalTerm>[] = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ columns: true, trim: true }))
      .on('data', (row) => {
        // Convert CSV row to term object
        const term = {
          englishTerm: row.englishTerm,
          turkishTerm: row.turkishTerm,
          partOfSpeech: row.partOfSpeech,
          legalContext: row.legalContext.split(',').map((context: string) => context.trim()),
          sampleSentences: [
            {
              english: row.sampleEnglish,
              turkish: row.sampleTurkish
            }
          ]
        };
        terms.push(term);
      })
      .on('end', () => resolve(terms))
      .on('error', reject);
  });
} 
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async readGithubRanking(n: number = 2, l: string = 'JavaScript') {
    const results = [];
    let count: number = 0;
    return new Promise((resolve, reject) =>
      createReadStream(
        join(process.cwd(), `src/files/github-ranking-2018-12-18.csv`),
      )
        .pipe(csv())
        .on('error', (error) => reject(error))
        .on('data', (data) => results.push(data))
        .on('end', () => {
          const filters = results.filter((data) => {
            if (count < n && data.language == l) {
              count++;
              return true;
            }
            return false;
          });
          resolve(filters);
        }),
    );
  }
}

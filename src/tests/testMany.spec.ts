import fs from 'fs';
import { testDonation } from './donations.spec';
import { testRoot } from './root.spec';
import { Grades } from './grades';
import { urls } from '../urls.json';

jest.setTimeout(45000);
const arrGrades:{
  name?: string,
  url: string,
  grade: number,
  asserts: string,
}[] = [];
const bootstrapTest = (baseUrl: string, counter: Grades) => {
  testRoot(baseUrl, counter);
  testDonation(baseUrl, counter);
};

describe('[Testing] Many URLs', () => {
  urls.forEach((item) => {
    const baseUrl = item.url.replace(/\/$/, '');
    const Counter = new Grades();

    bootstrapTest(baseUrl, Counter);

    afterAll(() => {
      process.stdout.write(`Acertos: ${Counter.getAsserts()}/${Counter.getTests()} - URL: ${baseUrl} \r\n`);

      arrGrades.push({
        name: item?.name,
        url: baseUrl,
        grade: Counter.getValue(),
        asserts: `${Counter.getAsserts()}/${Counter.getTests()}`,
      });
    });
  });
  afterAll(() => {
    console.log('\n\n\n');
    arrGrades.sort((a, b) => b.grade - a.grade);
    console.log(arrGrades);
    fs.writeFileSync('./src/grades.json', JSON.stringify(arrGrades, null, 2));
  });
});

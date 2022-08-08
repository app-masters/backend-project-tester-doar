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
const bootstrapTest = (name:string, baseUrl: string, counter: Grades) => {
  testRoot(baseUrl, counter);
  testDonation(baseUrl, counter);
};

describe('[Testing] Many URLs', () => {
  for (let i=0; i<urls.length; i++){
    const item = urls[i];
    const baseUrl = item.url.replace(/\/$/, '');
    const Counter = new Grades();

    bootstrapTest(item.name, baseUrl, Counter);

    afterAll(() => {
      arrGrades.push({
        name: item?.name,
        url: baseUrl,
        grade: Counter.getValue(),
        asserts: `${Counter.getAsserts()}/${Counter.getTests()}`,
      });
    });
  };
  afterAll(() => {
    console.log('\n\n\n');
    arrGrades.sort((a, b) => b.grade - a.grade);
    arrGrades.forEach((item) => {
      process.stdout.write(`Acertos: ${item.asserts} - Dev: ${item.name} - URL: ${item.url} \r\n`);
    });
    fs.writeFileSync('./src/grades.json', JSON.stringify(arrGrades, null, 2));
  });
});

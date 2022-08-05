import { testDonation } from './donations.spec';
import { testRoot } from './root.spec';
import { Grades } from './grades';

jest.setTimeout(45000);
const argUrl = process.argv[process.argv.length - 1].slice(2);
if (argUrl.slice(0, 3) !== 'url') {
  process.stdout.write('Correct arg --> "--url=http://myUrl.com"');
  process.exit();
}
const baseUrl = argUrl.slice(4).replace(/\/$/, '');
const Counter = new Grades();

const bootstrapTest = () => {
  testRoot(baseUrl, Counter);
  testDonation(baseUrl, Counter);
};

describe(`[Testing] URL: ${baseUrl}`, () => {
  beforeAll(() => {
    process.stdout.write(`Testing: ${baseUrl}`);
  });

  bootstrapTest();

  afterAll(() => {
    process.stdout.write(`
      Testing: ${baseUrl}
      Nota final: ${Counter.getValue()}
      Total de acertos: ${Counter.getAsserts()}/${Counter.getTests()}
    `);
  });
});

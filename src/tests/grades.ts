export class Grades {
  private grade: number;

  private asserts: number;

  private tests: number;

  constructor() {
    this.grade = 0;
    this.asserts = 0;
    this.tests = 0;
  }

  increment(value: number) {
    this.grade += value;
    this.asserts += 1;
  }

  newTest() {
    this.tests += 1;
  }

  getValue() {
    return this.grade;
  }

  getAsserts() {
    return this.asserts;
  }

  getTests() {
    return this.tests;
  }
}

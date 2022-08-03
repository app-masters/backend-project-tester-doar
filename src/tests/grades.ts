export class Grades {
  grade: number;

  constructor() {
    this.grade = 0;
  }

  increment(value: number) {
    this.grade += value;
  }

  getValue() {
    return this.grade;
  }
}

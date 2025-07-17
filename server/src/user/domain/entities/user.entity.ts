export class User {
  constructor(
    public name: string,
    public email: string,
    public studentNumber: number = 0,
    public totalDiscount: number = 0,
    public readonly id?: number,
  ) {}
  static create(name: string, email: string): User {
    return new User(name, email);
  }
  changeName(name: string): void {
    this.name = name;
  }
  changeStudentNumber(sn: number): boolean {
    if (this.studentNumber === 0) {
      this.studentNumber = sn;
      return true;
    } else {
      return false;
    }
  }
  addDiscount(discount: number): void {
    this.totalDiscount += discount;
  }
}

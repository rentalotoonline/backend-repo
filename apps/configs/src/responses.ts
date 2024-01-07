export default class AppResponse{
  get _code(): number {
    return this.code;
  }

  set _code(value: number) {
    this.code = value;
  }

  get _message(): string {
    return this.message;
  }

  set _message(value: string) {
    this.message = value;

  }

  get _data(): any {
    return this.data;
  }

  set _data(value: any) {
    this.data = value;
  }
  private code:number;
  private message:string;
  private data?:any;

}
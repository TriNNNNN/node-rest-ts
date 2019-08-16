// import HttpException from "./HttpException"
class UserDefinedError extends Error {
    status: number;message: string;;error: any
    constructor(status: number, message: any, error?: any) {
      super(message);
      this.status = status;
      this.message = message;
      this.error = error
    }
}
export default UserDefinedError;

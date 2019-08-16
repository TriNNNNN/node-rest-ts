// import HttpException from "./HttpException"
class UserDefinedError extends Error {
    status: number;message: string;;error: any
    constructor(status: number, message: any, error?: any) {
      console.log('error---->', error)
      super(message);
      this.status = status;
      this.message = message;
      this.error = error && error.errors ? error.errors : 'Unhandled Error'
    }
}
export default UserDefinedError;

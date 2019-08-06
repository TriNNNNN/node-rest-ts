// import HttpException from "./HttpException"
class UserDefinedError extends Error {
    status: number;message: string;
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
}
export default UserDefinedError;

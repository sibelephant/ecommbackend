import { HttpExceptions,ErrorCode } from "./root";

export class BadRequestsException extends HttpExceptions{
    constructor(message:string, errorCode:ErrorCode){
        super(message,errorCode,400,null)
    }
}

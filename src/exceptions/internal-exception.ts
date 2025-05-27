import { HttpExceptions } from "./root";

export class InternalException extends HttpExceptions{
    constructor(
        message: string,
        errorCode: number,
        errors: any
    ) {
        super(message, errorCode, 500, errors);
}
}
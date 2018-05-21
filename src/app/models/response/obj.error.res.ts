export class ObjectErrorResponse<T> {
    result: Number;

    message: string;

    error: T;

    constructor(obj) {
        this.result = obj.result;
        this.message = obj.message;
        this.error = obj.error;
    }
}
export class ObjectSuccessResponse<T> {
    result: Number;

    message: string;

    value: T;

    constructor(obj) {
        this.result = obj.result;
        this.message = obj.message;
        this.value = obj.value;
    }
}
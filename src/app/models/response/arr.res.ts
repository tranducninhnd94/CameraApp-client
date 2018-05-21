export class ArrayObject<T> {
    total: Number;

    list: T;


    constructor(obj) {
        this.total = obj.total;
        this.list = obj.list;
    }
}
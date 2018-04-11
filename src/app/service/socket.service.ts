import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SocketService {
    private socket = io("http://localhost:8080");
    private socket1 = io("http://localhost:8080/cam0");
    private Observer: Observable<any>;

    constructor() { }

    getMsgCreateRoom(): Observable<any> {
        let observable = new Observable<any>(observer => {
            this.socket.on("start", res => {
                observer.next(res);
            });
        });
        return observable;
    }

    getData(): Observable<any> {
        let observable = new Observable<any>(observer => {
            this.socket1.on("data", data => {
                observer.next(data);
            });
        });
        return observable;
    }
}

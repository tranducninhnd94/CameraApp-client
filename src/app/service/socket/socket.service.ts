import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SocketService {
    private socket = io("http://localhost:8080");
    private nsSocket = io("http://localhost:8080/cam0");
    private Observer: Observable<any>;

    constructor() { }

    sk_GetAllCamera(): Observable<any> {
        let observable = new Observable<any>(observer => {
            this.socket.on("start", res => {
                observer.next(res);
            });
        });
        return observable;
    }

    getData(namesapce): Observable<any> {
        let ns = "http://localhost:8080" + namesapce;
        console.log("service namespace : ", ns);
        this.nsSocket = io(ns);
        let observable = new Observable<any>(observer => {
            this.nsSocket.on("data", data => {
                observer.next(data);
            });
        });
        return observable;
    }
}

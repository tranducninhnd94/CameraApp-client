import { Injectable } from "@angular/core";
import { Observer } from "rxjs/Observer";
import { Http, ResponseOptions, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ObjectSuccessResponse } from "../../models/response/obj.success.res";
import { Video } from "../../models/video/video.model";
import { ArrayObject } from "../../models/response/arr.res";
import { ObjectErrorResponse } from "../../models/response/obj.error.res";

@Injectable()
export class VideoService {
    constructor(private http: Http) {
    }

    getVideosByCamera(): Observable<ObjectSuccessResponse<ArrayObject<Array<Video>>>> {
        return this.http.get("").map((res: Response) => res.json())
            .catch(this.handleServerError);
    }

    private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
        return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
    }
}
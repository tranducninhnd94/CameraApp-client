import { Injectable } from "@angular/core";
import { Observer } from "rxjs/Observer";
import { Http, ResponseOptions, Response, Headers, RequestOptions } from "@angular/http";
import { ObjectSuccessResponse } from "../../models/response/obj.success.res";
import { Camera } from "../../models/camera/camera.model";
import { Observable } from 'rxjs/Rx';
import { Constant } from "../../common/constants";
import { ObjectErrorResponse } from "../../models/response/obj.error.res";
@Injectable()
class CameraService {
    constructor(private http: Http) {

    }

    getAllCamera(): Observable<ObjectSuccessResponse<Array<Camera>>> {
        return this.http
            .get(Constant.URL_GET_ALL_CAMERA)
            .map((res: Response) => res.json())
            .catch(this.handleServerError);
    }

    private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
        return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
    }
}
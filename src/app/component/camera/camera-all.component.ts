import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { SocketService } from '../../service/socket/socket.service';
import { Camera } from '../../models/camera/camera.model';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'camera-page',
    templateUrl: './camera-all.component.html',
    styleUrls: ['./camera-all.component.css'],
})

export class CameraComponent implements OnDestroy {

    title = 'Not Found';
    @ViewChild("divCanvas") divCanvas: ElementRef;
    public context: CanvasRenderingContext2D;

    private observerStart: ISubscription;

    private observerData: ISubscription;

    public timeView: Date = new Date();

    public totalMinuteView = 15;

    public hourView = 0;

    public minuteView = 15;

    arrCamera = new Array<Camera>();

    constructor(private socketService: SocketService) {

    }

    ngOnInit(): void {
        this.listennerStart();
    }

    listennerStart() {
        this.observerStart = this.socketService.sk_GetAllCamera().subscribe(res => {
            console.log("res :", res);
            this.arrCamera = res;
            console.log("arr: ", this.arrCamera);
        }, error => {
            console.log("error : ", error);
        })
    }

    listennerData(camera) {
        this.observerData = this.socketService.getData(camera.namespace).subscribe(data => {

            console.log("data");
            var bytes = new Uint8Array(data);

            var blob = new Blob([bytes], { type: 'application/octet-binary' });

            var url = URL.createObjectURL(blob);

            var img = new Image;

            var ctx = (<HTMLCanvasElement>this.divCanvas.nativeElement).getContext('2d');

            img.onload = function () {
                URL.revokeObjectURL(url);
                console.log(img.height + ' ' + img.width)
                ctx.drawImage(img, 0, 0, 640, 480);
            };
            img.src = url;
        }, error => {
            console.log("error : ", error);
        })
    }

    // onChange(i) {
    //     console.log("camera :", i);
    //     this.listennerData(this.arrCamera[i]);
    // }

    realTimeCamera(index){
        console.log("index :", index);
        if (this.observerData) this.observerData.unsubscribe();
        this.listennerData(this.arrCamera[index]);
    }

    ngOnDestroy(): void {
        this.observerStart.unsubscribe();
        this.observerData.unsubscribe();
    }
}
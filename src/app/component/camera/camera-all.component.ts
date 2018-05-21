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

    onChange(i) {
        console.log("camera :", i);
        this.listennerData(this.arrCamera[i]);
    }

    base64ArrayBuffer(arrayBuffer) {
        var base64 = '';
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var bytes = new Uint8Array(arrayBuffer);
        var byteLength = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength = byteLength - byteRemainder;
        var a, b, c, d;
        var chunk;
        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
            d = chunk & 63;               // 63       = 2^6 - 1
            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }
        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];
            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4; // 3   = 2^2 - 1
            base64 += encodings[a] + encodings[b] + '==';
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2; // 15    = 2^4 - 1
            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }
        return base64;
    }

    ngOnDestroy(): void {
        this.observerStart.unsubscribe();
        this.observerData.unsubscribe();
    }
}
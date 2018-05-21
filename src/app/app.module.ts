import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CameraComponent } from './component/camera/camera-all.component';
import { Routing } from './routes/routes-app';
import { SocketService } from './service/socket/socket.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

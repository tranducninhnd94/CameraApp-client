import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CameraComponent } from './component/camera/camera-all.component';
import { Routing } from './routes/routes-app';
import { SocketService } from './service/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    Routing
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

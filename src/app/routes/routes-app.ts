import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "../app.component";
import { CameraComponent } from "../component/camera/camera-all.component";

const routes: Routes = [
//   {
//     path: "",
//     redirectTo: "/english/topic",
//     pathMatch: "full"
//   },
  {
    path: "camera/all",
    component: CameraComponent
  },
  
];

// export const Routing = RouterModule.forRoot(routes, { useHash: true });
export const Routing = RouterModule.forRoot(routes);

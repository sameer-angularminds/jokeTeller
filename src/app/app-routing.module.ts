import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SubmitComponent } from './submit/submit.component';
import { DisplayComponent } from './display/display.component';
const routes: Routes = [

  {path:"",redirectTo:"/mainPage",pathMatch:"full"},
  
  {path:"mainPage",component:MainPageComponent},
  {path:"submit",component:SubmitComponent},
  {path:"display",component:DisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

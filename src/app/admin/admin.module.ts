import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {MatSidenavContent} from "@angular/material/sidenav";
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavContent,
    MaterialModule
  ]
})
export class AdminModule { }

import {inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OperationComponent} from "./pages/operation/operation.component";
import {SessionService} from "../../core/services/session.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [() => inject(SessionService).isSessionActive],
    component: OperationComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OperationsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './pages/operation/operation.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import {OperationsRoutingModule} from "./operations-routing.module";
import {UserService} from "../../core/services/user.service";
import {SharedModule} from "../../shared/shared.module";
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputIconModule} from "primeng/inputicon";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    OperationComponent,
    BalanceComponent,
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    SharedModule,
    TabViewModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    OverlayPanelModule,
    InputIconModule,
    ProgressSpinnerModule
  ],
  providers: [
    UserService
  ]
})
export class OperationsModule { }

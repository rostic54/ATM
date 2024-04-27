import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PincodeComponent} from "./features/pincode/pincode.component";
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/pin', pathMatch: 'full' },
  {path: 'pin', component: PincodeComponent},
  {path: 'operations', canActivate:[authGuard], loadChildren: () => import('./features/operations/operations.module').then(m => m.OperationsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

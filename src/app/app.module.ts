import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PincodeComponent } from './features/pincode/pincode.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {SharedModule} from "./shared/shared.module";
import {InputOtpModule} from "primeng/inputotp";
import {CardModule} from "primeng/card";
import {ProgressSpinnerModule} from "primeng/progressspinner";

const primeNgModules = [
  PasswordModule,
  MessageModule,
  ToastModule,
  InputNumberModule,
  InputTextModule,
  OverlayPanelModule,
  ButtonModule,
  IconFieldModule,
  InputIconModule
]

@NgModule({
  declarations: [
    AppComponent,
    PincodeComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        ...primeNgModules,
        InputOtpModule,
        CardModule,
        ProgressSpinnerModule,
    ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

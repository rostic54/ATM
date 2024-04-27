import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CreditCardComponent} from "./components/credit-card/credit-card.component";
import {KeyboardComponent} from "./components/keyboard/keyboard.component";
import {ButtonModule} from "primeng/button";
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [CreditCardComponent, KeyboardComponent, HeaderComponent],
  imports: [
    CommonModule,
    ButtonModule,
    NgOptimizedImage
  ],
  exports: [
    CreditCardComponent,
    KeyboardComponent,
    HeaderComponent,

  ]
})
export class SharedModule { }

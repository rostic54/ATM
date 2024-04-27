import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonInfo} from "../../../core/interfaces/user";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardComponent {
@Input() userInfo: CommonInfo;
  showback = false;
}

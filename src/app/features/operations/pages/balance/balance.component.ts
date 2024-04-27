import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent implements OnInit {
  balance: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.balance = this.userService.assetsAmount;
  }

}

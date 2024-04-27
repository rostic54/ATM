import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawComponent implements OnInit {
  withdrawAmount: FormControl;
  assetsAmount = 0;
  loading = false;

  get isWithdrawAmountValid(): boolean {
    return this.withdrawAmount.invalid || this.withdrawAmount.value <= 0;
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.assetsAmount = this.userService.assetsAmount;
    this.withdrawAmount = new FormControl(null, [Validators.max(this.assetsAmount)])
  }

  withdraw() {
    this.blockEvents()
    this.userService.withdrawMoney(this.withdrawAmount.value)
      .pipe(
        finalize(() => this.unblockEvents()),
      )
      .subscribe(() => {
          this.unblockEvents()
        }
      );
  }

  private blockEvents(): void {
    this.loading = true;
    this.withdrawAmount.disable();
  }

  private unblockEvents(): void {
    this.loading = false;
    this.withdrawAmount.reset(0);
    this.withdrawAmount.enable();
  }
}

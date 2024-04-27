import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  concatMap,
  delay,
  finalize,
  Observable,
  of,
  pipe,
  retry,
  Subscription,
  UnaryFunction
} from "rxjs";
import {PinCodeService} from "../../core/services/pin-code.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {StatusIcon} from "../../core/enums/status-icon";
import {OverlayPanel} from "primeng/overlaypanel";
import {InputOtp} from "primeng/inputotp";

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrl: './pincode.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PincodeComponent implements OnInit, OnDestroy {
  pinCode: FormControl;
  CODE_LENGTH = 4;
  attempts = 0;
  iconType = StatusIcon.HIDE;
  subscription: Subscription;

  @ViewChild("pinCodeField") myInputField: ElementRef;
  @ViewChild("panel") panel: OverlayPanel;
  @ViewChild("inputRef") input: InputOtp;

  get isDecrypted(): boolean {
    return this.iconType === StatusIcon.SHOW;
  }

  constructor(private pinCodeService: PinCodeService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleVisibility(): void {
    this.iconType = this.iconType === StatusIcon.HIDE ? StatusIcon.SHOW : StatusIcon.HIDE;
  }

  getStatusIcon(): string {
    switch (this.iconType) {
      case StatusIcon.SHOW:
        return StatusIcon.SHOW;
      case StatusIcon.HIDE:
        return StatusIcon.HIDE;
      case StatusIcon.SPINER:
        return StatusIcon.SPINER;
      case StatusIcon.BAN:
        return StatusIcon.BAN;
      default:
        return StatusIcon.HIDE
    }
  }

  initForm(): void {
    this.pinCode = new FormControl('',
      [
        Validators.required, Validators.minLength(this.CODE_LENGTH)]);
  }

  confirmPin(): void {
    this.pinCode.disable({emitEvent: false});
    this.iconType = StatusIcon.SPINER;
    const code = this.pinCode.value.trim();
    this.subscription = this.pinCodeService.sendPinCodeForAudit([...code])
    .pipe(
      this.shortTermBlock(),
      retry(),
      finalize(() => {
        this.establishControl();
      }),
    ).subscribe((result: boolean) => {
      if (result) {
        this.router.navigate(['/operations'])
      } else {
        this.attempts++;
        this.establishControl();
      }
    })
  }

  private shortTermBlock(): UnaryFunction<Observable<boolean>, Observable<boolean>> {
    return pipe(
      concatMap((isCorrectPin: boolean) => {
        if (this.attempts === 3 && !isCorrectPin) {
          this.iconType = StatusIcon.BAN;
          this.attempts = 0;
          this.panel.hide();
          return of(isCorrectPin).pipe(delay(5000))
        }
        return of(isCorrectPin);
      }),
    )
  }

  private establishControl(): void {
    this.pinCode.enable({emitEvent: false});
    this.pinCode.reset();
    this.iconType = StatusIcon.HIDE;
  }
}

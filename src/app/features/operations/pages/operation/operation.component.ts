import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {CommonInfo} from "../../../../core/interfaces/user";
import {delay, finalize, Observable, tap} from "rxjs";
import {SessionService} from "../../../../core/services/session.service";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationComponent implements OnInit {
  userInfo$: Observable<CommonInfo>;

  constructor(private userService: UserService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.userInfo$ = this.userService.getUserData()
      .pipe(
        tap(() => this.sessionService.loadingStatus = true),
        delay(2000),
        finalize(() => {
          this.sessionService.loadingStatus = false;
        }),
      )
  }

}

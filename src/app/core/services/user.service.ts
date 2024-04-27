import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {catchError, EMPTY, map, Observable, tap} from "rxjs";
import {CommonInfo, Detail} from "../interfaces/user";
import {NotificationService} from "./notification.service";

@Injectable()
export class UserService {
  private readonly USER_URL = 'https://cms-stage.revelator.com/items/interview_user';
  private userInfo: Detail;

  get assetsAmount(): number {
    return this.userInfo.card_balance
  }

  constructor(private apiService: ApiService, private notificationService: NotificationService) { }

  getUserData(): Observable<CommonInfo> {
    return this.apiService.get(this.USER_URL).pipe(
      map((user: Detail) => {
        this.userInfo = user;
        return {
          card_holder: user.card_holder,
          card_number: user.card_number,
          card_type: user.card_type,
        } as CommonInfo
      }),
      catchError(err => {
        this.notificationService.errorToast(err.errors[0].message);
        return EMPTY;
      })
    );
  }

  withdrawMoney(amount: number) {
    return this.apiService.post(amount)
      .pipe(
        tap(() => this.notificationService.successToast(`Take your ${amount}$`)),
        catchError(err => {
          this.notificationService.errorToast(err.message);
          return EMPTY
        })
      )
  }
}

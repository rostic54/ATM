import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "./core/services/session.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionService.isLoading
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.isLoading = result);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SessionService} from "../../../core/services/session.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  loading$: Observable<boolean>;

  get isActive(): boolean {
    return this.sessionService.isSessionActive();
  }

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.loading$ = this.sessionService.isLoading;
  }

  exit(): void {
    this.sessionService.logout();
  }
}

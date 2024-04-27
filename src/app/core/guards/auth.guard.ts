import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SessionService} from "../services/session.service";

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if(!sessionService.isSessionActive()) {
    return router.createUrlTree(['/pin'])
  }
  return true;
};

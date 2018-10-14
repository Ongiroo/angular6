
import * as Sentry from '@sentry/browser';
import { ErrorHandler, Inject, NgZone, isDevMode, Injector } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

export class AppErrorHandler implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    @Inject(Injector) private readonly injector: Injector) {
  }

  handleError(error: any): void {
    console.log(error);
    this.ngZone.run(() => {
      this.toastr.errorToastr(error, 'Error', {
        position: 'top-right',
        showCloseButton: true,
      });
    });

/*     if (!isDevMode()) {
      Sentry.captureException(error.originalError || error);
    } else  {
      throw error();
    } */
  }
  private get toastr(): ToastrManager {
    return this.injector.get(ToastrManager);
  }
}

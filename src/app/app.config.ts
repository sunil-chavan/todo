import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), APP_ROUTES, provideAnimationsAsync()],
};

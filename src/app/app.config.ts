import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient,withInterceptorsFromDi } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(
      NgxUiLoaderModule,                           
      NgxUiLoaderHttpModule.forRoot({ showForeground: true })
    )
  ]
};

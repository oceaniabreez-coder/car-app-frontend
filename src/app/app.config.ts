import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient,withInterceptorsFromDi } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      NgxUiLoaderModule,                           
      NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
      ToastrModule.forRoot({
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    )
  ]
};

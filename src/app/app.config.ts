import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth/auth-Interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    // Provide HTTP Client for making HTTP requests
    // withFetch() is a built-in "adapter" for HttpClient.
    // It tells Angular to use the browser’s native fetch() API to make HTTP requests, instead of XMLHttpRequest (XHR).
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};

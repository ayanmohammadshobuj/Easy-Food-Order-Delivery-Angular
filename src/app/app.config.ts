import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./auth/token.interceptor";
import {errorInterceptor} from "./auth/error.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes)
    , provideClientHydration()
    , provideHttpClient()
    , provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])), provideAnimationsAsync()
    , provideNativeDateAdapter()
  ]
};

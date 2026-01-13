import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // <-- IMPORTANT
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <-- Ajoutez ceci pour que le service fonctionne
  ]
};
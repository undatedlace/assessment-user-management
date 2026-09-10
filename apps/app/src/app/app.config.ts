import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// NgRx Imports
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//Optimus UI configurations
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';

// reducers
import { authFeature } from './store/auth/auth.reducer';
import { usersFeature } from './store/users/users.reducer';


//effects
import * as authEffects from './store/auth/auth.effects';
import * as usersEffects from './store/users/users.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [usersFeature.name]: usersFeature.reducer,
    }),
    provideEffects([authEffects, usersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideOptimus({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    })
  ],
};

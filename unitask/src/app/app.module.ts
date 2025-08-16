import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {MsalModule, MsalRedirectComponent, MsalService} from '@azure/msal-angular';
import {PublicClientApplication, InteractionType} from '@azure/msal-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MsalModule.forRoot(new PublicClientApplication({ auth: {
          clientId: 'YOUR_AZURE_APP_CLIENT_ID',
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: 'http://localhost:8100'
        }

    }),{
        interactionType: InteractionType.Redirect
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map()
    }
  )],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}

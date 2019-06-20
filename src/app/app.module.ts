import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {EncrapterComponent} from './encrapter/encrapter.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {path: 'encrapter', component: EncrapterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EncrapterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbThemeModule.forRoot({name: 'corporate'}),
    NbCardModule,
    NbAccordionModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    BrowserAnimationsModule,
  ],
  providers: [NbMenuService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

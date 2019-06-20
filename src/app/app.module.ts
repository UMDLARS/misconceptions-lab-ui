import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([], {useHash: true}),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbThemeModule.forRoot(),
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

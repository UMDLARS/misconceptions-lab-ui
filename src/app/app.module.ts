import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbStepperModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbThemeModule,
} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {EncrapterComponent} from './encrapter/encrapter.component';
import {HomeComponent} from './home/home.component';
import {PhysicalsecurityComponent} from './physicalsecurity/physicalsecurity.component';
import {NotatargetComponent} from './notatarget/notatarget.component';
import {GoodpasswordsComponent} from './goodpasswords/goodpasswords.component';
import {CompletelyanonymousComponent} from './completelyanonymous/completelyanonymous.component';
import {SecurityinmindComponent} from './securityinmind/securityinmind.component';
import {SecurityproductComponent} from './securityproduct/securityproduct.component';
import {HumansarerationalComponent} from './humansarerational/humansarerational.component';
import {TrustUsersComponent} from './trust-users/trust-users.component';
import {AnonymizedDataComponent} from './anonymized-data/anonymized-data.component';
import {SecurityByObscurityComponent} from './security-by-obscurity/security-by-obscurity.component';
import {DefenseInDepthComponent} from './defense-in-depth/defense-in-depth.component';
import {UsersAreNotMaliciousComponent} from './users-are-not-malicious/users-are-not-malicious.component';
import {PrivacyNotImportantComponent} from './privacy-not-important/privacy-not-important.component';
import {EncryptionAutoIntegrityComponent} from './encryption-auto-integrity/encryption-auto-integrity.component';
import {TwoFAComponent} from './two-fa/two-fa.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {path: 'encrapter', component: EncrapterComponent},
  {path: 'anonymized', component: AnonymizedDataComponent},
  {path: 'completlyanonymous', component: CompletelyanonymousComponent},
  {path: 'defenseindepth', component: DefenseInDepthComponent},
  {path: 'encryptionautointegrity', component: EncryptionAutoIntegrityComponent},
  {path: 'goodpasswords', component: GoodpasswordsComponent},
  {path: 'humansarerational', component: HumansarerationalComponent},
  {path: 'notatarget', component: NotatargetComponent},
  {path: 'physicalsecruity', component: PhysicalsecurityComponent},
  {path: 'privacynotimportant', component: PrivacyNotImportantComponent},
  {path: 'securitybyobscurity', component: SecurityByObscurityComponent},
  {path: 'securityinmind', component: SecurityinmindComponent},
  {path: 'secruityproduct', component: SecurityproductComponent},
  {path: 'trustusers', component: TrustUsersComponent},
  {path: 'usersarenotmalicious', component: UsersAreNotMaliciousComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EncrapterComponent,
    HomeComponent,
    PhysicalsecurityComponent,
    NotatargetComponent,
    GoodpasswordsComponent,
    CompletelyanonymousComponent,
    SecurityinmindComponent,
    SecurityproductComponent,
    HumansarerationalComponent,
    TrustUsersComponent,
    AnonymizedDataComponent,
    SecurityByObscurityComponent,
    DefenseInDepthComponent,
    UsersAreNotMaliciousComponent,
    PrivacyNotImportantComponent,
    EncryptionAutoIntegrityComponent,
    TwoFAComponent,
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
    NbTreeGridModule,
    NbEvaIconsModule,
    BrowserAnimationsModule,
    NbTabsetModule,
    NbStepperModule,
    ReactiveFormsModule,
  ],
  providers: [NbMenuService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

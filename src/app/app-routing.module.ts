import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EncryptionIsEnoughComponent} from './encryption-is-enough/encryption-is-enough.component';
import {AnonymizedDataComponent} from './anonymized-data/anonymized-data.component';
import {CompletelyanonymousComponent} from './completelyanonymous/completelyanonymous.component';
import {DefenseInDepthComponent} from './defense-in-depth/defense-in-depth.component';
import {EncryptionAutoIntegrityComponent} from './encryption-auto-integrity/encryption-auto-integrity.component';
import {GoodpasswordsComponent} from './goodpasswords/goodpasswords.component';
import {ConfigurationsComponent} from './configurations/configurations.component';
import {HumansarerationalComponent} from './humansarerational/humansarerational.component';
import {NotatargetComponent} from './notatarget/notatarget.component';
import {PhysicalsecurityComponent} from './physicalsecurity/physicalsecurity.component';
import {PrivacyNotImportantComponent} from './privacy-not-important/privacy-not-important.component';
import {SecurityByObscurityComponent} from './security-by-obscurity/security-by-obscurity.component';
import {SecurityinmindComponent} from './securityinmind/securityinmind.component';
import {SecurityproductComponent} from './securityproduct/securityproduct.component';
import {TrustUsersComponent} from './trust-users/trust-users.component';
import {UsersAreNotMaliciousComponent} from './users-are-not-malicious/users-are-not-malicious.component';
import {TwoFAComponent} from './two-fa/two-fa.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {path: 'encryptionisenough', component: EncryptionIsEnoughComponent},
  {path: 'anonymized', component: AnonymizedDataComponent},
  {path: 'completelyanonymous', component: CompletelyanonymousComponent},
  {path: 'defenseindepth', component: DefenseInDepthComponent},
  {path: 'encryptionautointegrity', component: EncryptionAutoIntegrityComponent},
  {path: 'goodpasswords', component: GoodpasswordsComponent},
  {path: 'configurations', component: ConfigurationsComponent},
  {path: 'humansarerational', component: HumansarerationalComponent},
  {path: 'notatarget', component: NotatargetComponent},
  {path: 'physicalsecruity', component: PhysicalsecurityComponent},
  {path: 'privacynotimportant', component: PrivacyNotImportantComponent},
  {path: 'securitybyobscurity', component: SecurityByObscurityComponent},
  {path: 'securityinmind', component: SecurityinmindComponent},
  {path: 'secruityproduct', component: SecurityproductComponent},
  {path: 'trustusers', component: TrustUsersComponent},
  {path: 'usersarenotmalicious', component: UsersAreNotMaliciousComponent},
  {path: 'twofactor', component: TwoFAComponent},
  {
    path: '**',
    redirectTo: 'home'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

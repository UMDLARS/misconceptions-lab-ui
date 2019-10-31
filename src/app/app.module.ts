import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
  NbTabsetModule,
  NbThemeModule,
  NbTreeGridModule,
} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {EncryptionIsEnoughComponent} from './encryption-is-enough/encryption-is-enough.component';
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
import {ROUTES} from './routes';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {LabOverviewComponent} from './layout/lab-overview/lab-overview.component';
import {LabActivityComponent} from './layout/lab-activity/lab-activity.component';
import {LabIndustryComponent} from './layout/lab-industry/lab-industry.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {ConfigurationsComponent} from './configurations/configurations.component';
import { TestLayoutComponent } from './test-layout/test-layout.component';
import {LabRelevanceComponent} from './layout/lab-relevance/lab-relevance.component';
import {LabCheckComponent} from './layout/lab-check/lab-check.component';

@NgModule({
  declarations: [
    AppComponent,
    EncryptionIsEnoughComponent,
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
    LabOverviewComponent,
    HeaderComponent,
    FooterComponent,
    ConfigurationsComponent,
    TestLayoutComponent,
    LabActivityComponent,
    LabRelevanceComponent,
    LabIndustryComponent,
    LabCheckComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbThemeModule.forRoot({name: 'customized'}),
    NbCardModule,
    NbAccordionModule,
    NbMenuModule.forRoot(),
    NbTreeGridModule,
    NbEvaIconsModule,
    BrowserAnimationsModule,
    NbTabsetModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbInputModule,
    NbActionsModule,
    NbIconModule,
    NbSelectModule,
    HttpClientModule,
    Ng2SmartTableModule,
  ],
  providers: [NbMenuService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

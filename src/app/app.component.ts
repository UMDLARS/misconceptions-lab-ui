import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NbIconLibraries, NbMenuItem} from '@nebular/theme';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/home',
      home: true,
      hidden: true, // Without this things stay selected on clicking the Home button
    },
    {
      title: 'Encryption',
      link: '/encrapter',
      icon: 'shield-alt',

    },
    {
      title: 'Physical Secruity',
      link: '/physicalsecruity',
      icon: 'lock',
    },
    {
      title: 'Not a target',
      link: '/notatarget',
      icon: 'bullseye',
    },
    {
      title: 'Good Passwords',
      link: '/goodpasswords',
      icon: 'key',
    },
    {
      title: 'Completely Anonymous',
      link: '/completelyanonymous',
      icon: 'mask'
    },
    {
      title: 'Security in Mind',
      link: '/securityinmind',
      icon: 'brain',
    },
    {
      title: 'Secruity Product',
      link: '/secruityproduct',
      icon: 'magic',
    },
    {
      title: 'Humans are Rational',
      link: '/humansarerational',
      icon: 'meh-rolling-eyes',
    },
    {
      title: 'Trust Users',
      link: '/trustusers',
      icon: 'user-lock',
    },
    {
      title: 'Anonymized Data',
      link: '/anonymized',
      icon: 'database',
    },
    {
      title: 'Security by Obscurity',
      link: '/securitybyobscurity',
      icon: 'low-vision',
    },
    {
      title: 'Defense in Depth',
      link: '/defenseindepth',
      icon: 'chess-rook',
    },
    {
      title: 'Users are not Malicious',
      link: '/usersarenotmalicious',
      icon: 'user-secret',
    },
    {
      title: 'Privacy not Important',
      link: '/privacynotimportant',
      icon: 'id-card',
    },
    {
      title: 'Encryption Auto Integrity',
      link: '/encryptionautointegrity',
      icon: 'file-contract',
    },
    {
      title: '2FA',
      link: '/twofactor',
      icon: 'mobile-alt',
    },
  ];

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', {packClass: 'fas', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('font-awesome-brands', {packClass: 'fab', iconClassPrefix: 'fa'});
    this.iconLibraries.setDefaultPack('font-awesome');
  }

}

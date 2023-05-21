import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setTheme(darkTheme: boolean) {
    if (darkTheme) this.theme = 'theme-alternate';
    else this.theme = '';
  }

  isDarkTheme(): boolean {
    if (localStorage.getItem('theme') == 'theme-alternate') return true;
    return false;
  }

  set theme(theme: string) {
    localStorage.setItem('theme', theme);
  }

  get theme() {
    if (localStorage.getItem('theme') == null) {
      return '';
    } else {
      return localStorage.getItem('theme') as string;
    }
  }
}

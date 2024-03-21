import { Injectable, signal } from '@angular/core';

// TODO: save to local storage
// TODO: initialize based on local storage value
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _$darkMode = signal(false);
  $darkMode = this._$darkMode.asReadonly();

  setDarkMode(isDarkMode: boolean) {
    this._$darkMode.set(isDarkMode);
    this._applyCssThemeClass();
  }

  toggleTheme() {
    this.setDarkMode(!this._$darkMode());
  }

  private _applyCssThemeClass() {
    if (this._$darkMode()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}

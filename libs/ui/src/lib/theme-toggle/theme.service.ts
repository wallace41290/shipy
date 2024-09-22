import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  static storageKey = 'shipy-theme-dark-mode';

  private _$darkMode = signal(false);
  $darkMode = this._$darkMode.asReadonly();

  constructor() {
    /** Read initial theme from local storage */
    const storedTheme = this._getStoredThemeName();
    this.setDarkMode(coerceBooleanProperty(storedTheme));
  }

  setDarkMode(isDarkMode: boolean) {
    this._$darkMode.set(isDarkMode);
    this._applyCssThemeClass();
    try {
      window.localStorage[ThemeService.storageKey] = isDarkMode;
    } catch {
      console.error('[ThemeService] Failed store theme in local storage');
    }
  }

  toggleTheme() {
    this.setDarkMode(!this._$darkMode());
  }

  private _getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeService.storageKey] || null;
    } catch {
      return null;
    }
  }

  private _applyCssThemeClass() {
    if (this._$darkMode()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}

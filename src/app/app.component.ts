import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeToggleComponent } from '@shipy/ui';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    ThemeToggleComponent,
  ],
  selector: 'shipy-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private matIconReg: MatIconRegistry,
    private media: MediaMatcher
  ) {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}

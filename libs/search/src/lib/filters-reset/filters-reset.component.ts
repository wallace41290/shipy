import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shipy-filters-reset',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './filters-reset.component.html',
  styleUrl: './filters-reset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersResetComponent {
  @Input() disableReset = false;

  @Output() closeSidenav = new EventEmitter();
}

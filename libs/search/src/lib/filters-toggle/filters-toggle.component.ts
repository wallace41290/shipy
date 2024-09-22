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
  selector: 'shipy-filters-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './filters-toggle.component.html',
  styleUrl: './filters-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersToggleComponent {
  @Input() filtersOpen = false;
  @Output() toggleFilters = new EventEmitter();
}

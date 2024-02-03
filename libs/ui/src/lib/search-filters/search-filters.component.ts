import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortFilterComponent } from '../port-filter/port-filter.component';
import { Port } from '@shipy/models';

@Component({
  selector: 'shipy-search-filters',
  standalone: true,
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PortFilterComponent],
})
export class SearchFiltersComponent {
  @Input() ports: Port[] = [];
  @Output() portsChange = new EventEmitter<Port[]>();
}

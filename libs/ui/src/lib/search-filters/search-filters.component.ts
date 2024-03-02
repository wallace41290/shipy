import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortFilterComponent } from '../port-filter/port-filter.component';
import { NumberOfNights, Port } from '@shipy/models';
import { DateRangeFilterComponent } from '../date-range-filter/date-range-filter.component';
import { getNextMonth } from '@shipy/utils';
import { NumNightsFilterComponent } from '../num-nights-filter/num-nights-filter.component';

@Component({
  selector: 'shipy-search-filters',
  standalone: true,
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PortFilterComponent, DateRangeFilterComponent, NumNightsFilterComponent],
})
export class SearchFiltersComponent {
  @Input() endDate = getNextMonth();
  @Input() numberOfNights: NumberOfNights[] = [];
  @Input() ports: Port[] = [];
  @Input() startDate = new Date();

  @Output() endDateChange = new EventEmitter<Date>();
  @Output() numberOfNightsChange = new EventEmitter<NumberOfNights[]>();
  @Output() portsChange = new EventEmitter<Port[]>();
  @Output() startDateChange = new EventEmitter<Date>();
}

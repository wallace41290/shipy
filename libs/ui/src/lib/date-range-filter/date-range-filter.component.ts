import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shipy-date-range-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-range-filter.component.html',
  styleUrl: './date-range-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeFilterComponent {

}

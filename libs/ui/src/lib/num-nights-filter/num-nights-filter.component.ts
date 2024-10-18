import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NumberOfNights, NumberOfNightsLabels } from '@shipy/models';
@Component({
  selector: 'shipy-num-nights-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSelectModule],
  templateUrl: './num-nights-filter.component.html',
  styleUrl: './num-nights-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumNightsFilterComponent {
  @Input() numberOfNights: NumberOfNights[] = [];
  @Output() numberOfNightsChange = new EventEmitter<NumberOfNights[]>();

  _allNumberOfNights = NumberOfNights.values;
  _numberOfNightsLabels = NumberOfNightsLabels;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shipy-num-nights-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './num-nights-filter.component.html',
  styleUrl: './num-nights-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumNightsFilterComponent {}

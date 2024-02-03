import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shipy-ships-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ships-filter.component.html',
  styleUrl: './ships-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsFilterComponent {}

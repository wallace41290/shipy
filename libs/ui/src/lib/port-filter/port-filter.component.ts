import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shipy-port-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './port-filter.component.html',
  styleUrl: './port-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortFilterComponent {}

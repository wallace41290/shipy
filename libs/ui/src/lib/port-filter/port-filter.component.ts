import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Port, PortLabels } from '@shipy/models';

@Component({
  selector: 'shipy-port-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './port-filter.component.html',
  styleUrl: './port-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortFilterComponent {
  @Input() ports: Port[] = [];
  @Output() portsChange = new EventEmitter<Port[]>();

  _portLabels = PortLabels;
}

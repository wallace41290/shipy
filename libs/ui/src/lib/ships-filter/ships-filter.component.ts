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
import { Ship, ShipLabels } from '@shipy/models';

@Component({
  selector: 'shipy-ships-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSelectModule],
  templateUrl: './ships-filter.component.html',
  styleUrl: './ships-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsFilterComponent {
  @Input() ships: Ship[] = [];
  @Output() shipsChange = new EventEmitter<Ship[]>();

  _allShips = Ship.values;
  _shipLabels = ShipLabels;
}

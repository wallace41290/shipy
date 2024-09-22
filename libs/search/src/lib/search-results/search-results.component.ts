import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  BooleanInput,
  NumberInput,
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import { Cruise } from '@shipy/data-access';

@Component({
  selector: 'shipy-search-results',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  @Input()
  get loading() {
    return this._loading;
  }
  set loading(value: BooleanInput) {
    this._loading = coerceBooleanProperty(value);
  }
  private _loading = false;

  @Input()
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value: NumberInput) {
    this._pageIndex = coerceNumberProperty(value, 0);
  }
  private _pageIndex = 0;

  @Input()
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value: NumberInput) {
    this._pageSize = coerceNumberProperty(value, 0);
  }
  private _pageSize = 10;

  @Input() results: Cruise[] = [];

  @Input()
  get totalResults() {
    return this._totalResults;
  }
  set totalResults(value: NumberInput) {
    this._totalResults = coerceNumberProperty(value, 0);
  }
  private _totalResults = 0;

  @Output() pageChanged = new EventEmitter<PageEvent>();

  displayedColumns: string[] = [
    'ship',
    'numNights',
    'sailDate',
    'stateroom',
    'avgPrice',
    'taxes',
  ];
}
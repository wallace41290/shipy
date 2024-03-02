import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { CruiseSearchService } from '@shipy/data-access';
import { BehaviorSubject } from 'rxjs';
import { CruiseSearchResponse } from '@shipy/data-access';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  deserializeSearchParams,
  serializePorts,
  deserializePorts,
  Port,
  SearchParams,
  deserializeDateRange,
  serializeDateRange,
  NumberOfNights,
  serializeNumberOfNights,
  deserializeNumberOfNights,
} from '@shipy/models';
import { MatTableModule } from '@angular/material/table';
import { SearchFiltersComponent } from '@shipy/ui';
import { getNextMonth } from '@shipy/utils';

// TODO: pagination
// TODO: ships
// TODO: sorting
// TODO: put filters in sidenav?
@Component({
  selector: 'shipy-search',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    SearchFiltersComponent,
    MatTableModule,
    NgIf,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private _cruiseSearchService = inject(CruiseSearchService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  selectedNumNights: NumberOfNights[] = [];
  selectedPorts: Port[] = [];
  startDate = new Date();
  endDate = getNextMonth();

  displayedColumns: string[] = [
    'ship',
    'numNights',
    'sailDate',
    'stateroom',
    'avgPrice',
    'taxes',
  ];
  searchResponse$ = new BehaviorSubject<CruiseSearchResponse | undefined>(
    undefined
  );

  private _tempStartDate: Date | undefined;
  private _tempEndDate: Date | undefined;

  constructor() {
    this._route.queryParams
      .pipe(takeUntilDestroyed())
      .subscribe((params: Params) => {
        // Sync Form Fields
        const searchParams = deserializeSearchParams(params);
        this.selectedPorts = deserializePorts(searchParams.departurePort);
        this.selectedNumNights = deserializeNumberOfNights(searchParams.nights);
        const dateRange = deserializeDateRange(searchParams.startDate);
        this.startDate = dateRange.start;
        this.endDate = dateRange.end;

        this.search(
          searchParams.departurePort,
          searchParams.startDate,
          searchParams.count,
          searchParams.skip,
          searchParams.nights
        );
      });
  }

  search(
    departurePort: string,
    startDate: string,
    count: number,
    skip: number,
    nights?: string
  ) {
    this._cruiseSearchService
      .search(departurePort, startDate, count, skip, nights)
      .subscribe((response) => this.searchResponse$.next(response));
  }

  endDateChanged(endDate: Date) {
    this._tempEndDate = endDate;
    this.updateDateRange();
  }

  startDateChanged(startDate: Date) {
    this._tempStartDate = startDate;
    this.updateDateRange();
  }

  updateDateRange() {
    if (
      this._tempStartDate &&
      this._tempEndDate &&
      this._tempStartDate < this._tempEndDate
    ) {
      const queryParams: Pick<SearchParams, 'startDate'> = {
        startDate: serializeDateRange({
          start: this._tempStartDate,
          end: this._tempEndDate,
        }),
      };

      this._tempStartDate = undefined;
      this._tempEndDate = undefined;

      this._router.navigate([], {
        relativeTo: this._route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  updatePort(ports: Port[]) {
    const queryParams: Pick<SearchParams, 'departurePort'> = {
      departurePort: serializePorts(ports),
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  updateNumberOfNights(numberOfNights: NumberOfNights[]) {
    const queryParams: Pick<SearchParams, 'nights'> = {
      nights: serializeNumberOfNights(numberOfNights),
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}

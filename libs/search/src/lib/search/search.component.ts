import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Cruise, CruiseSearchService } from '@shipy/data-access';
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
  Ship,
  deserializeShip,
  serializeShip,
} from '@shipy/models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SearchFiltersComponent } from '@shipy/ui';
import { getNextMonth } from '@shipy/utils';

// TODO: sorting
// TODO: put filters in sidenav?
@Component({
  selector: 'shipy-search',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    NgIf,
    SearchFiltersComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private _cruiseSearchService = inject(CruiseSearchService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  endDate = getNextMonth();
  pageIndex = 0;
  pageSize = 10;
  selectedNumNights: NumberOfNights[] = [];
  selectedPorts: Port[] = [];
  selectedShips: Ship[] = [];
  startDate = new Date();

  displayedColumns: string[] = [
    'ship',
    'numNights',
    'sailDate',
    'stateroom',
    'avgPrice',
    'taxes',
  ];

  $loading = signal(true);
  $results = signal<Cruise[]>([]);
  $total = signal(0);

  private _tempStartDate: Date | undefined;
  private _tempEndDate: Date | undefined;

  constructor() {
    this._route.queryParams
      .pipe(takeUntilDestroyed())
      .subscribe((params: Params) => {
        // Sync Form Fields
        const searchParams = deserializeSearchParams(params);
        this.pageSize = searchParams.count;
        this.pageIndex = searchParams.skip / searchParams.count;
        this.selectedPorts = deserializePorts(searchParams.departurePort);
        this.selectedNumNights = deserializeNumberOfNights(searchParams.nights);
        this.selectedShips = deserializeShip(searchParams.ship);
        const dateRange = deserializeDateRange(searchParams.startDate);
        this.startDate = dateRange.start;
        this.endDate = dateRange.end;

        this.search(
          searchParams.departurePort,
          searchParams.startDate,
          searchParams.count,
          searchParams.skip,
          searchParams.ship,
          searchParams.nights
        );
      });
  }

  endDateChanged(endDate: Date) {
    this._tempEndDate = endDate;
    this.updateDateRange();
  }

  pageChanged(pageEvent: PageEvent) {
    const queryParams: Pick<SearchParams, 'count' | 'skip'> = {
      count: pageEvent.pageSize,
      skip: pageEvent.pageIndex * pageEvent.pageSize,
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  search(
    departurePort: string,
    startDate: string,
    count: number,
    skip: number,
    ship?: string,
    nights?: string
  ) {
    this.$loading.set(true);
    this._cruiseSearchService
      .search(departurePort, startDate, count, skip, ship, nights)
      .subscribe((response) => {
        this.$results.set(response.data.cruiseSearch.results.cruises);
        this.$total.set(response.data.cruiseSearch.results.total);
        this.$loading.set(false);
      });
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

  updateShips(ships: Ship[]) {
    const queryParams: Pick<SearchParams, 'ship'> = {
      ship: serializeShip(ships),
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}

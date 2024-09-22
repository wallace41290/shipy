import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Cruise, CruiseSearchService } from '@shipy/data-access';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
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
import { SearchFiltersComponent } from '@shipy/ui';
import { getNextMonth } from '@shipy/utils';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FiltersResetComponent } from '../filters-reset/filters-reset.component';
import { FiltersToggleComponent } from '../filters-toggle/filters-toggle.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { PageEvent } from '@angular/material/paginator';

// TODO: sorting
@Component({
  selector: 'shipy-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    MatIconModule,

    MatSidenavModule,

    NgIf,
    SearchFiltersComponent,
    RouterModule,
    FiltersResetComponent,
    FiltersToggleComponent,
    SearchResultsComponent,
  ],
})
export class SearchComponent implements OnDestroy {
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _cruiseSearchService = inject(CruiseSearchService);
  private _media = inject(MediaMatcher);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  endDate = getNextMonth();
  mobileQuery: MediaQueryList;

  selectedNumNights: NumberOfNights[] = [];
  selectedPorts: Port[] = [];
  selectedShips: Ship[] = [];
  startDate = new Date();

  $hasQueryParams = signal(false);
  $loading = signal(true);
  $pageIndex = signal(0);
  $pageSize = signal(10);
  $results = signal<Cruise[]>([]);
  $total = signal(0);

  private _mobileQueryListener: () => void;
  private _tempStartDate: Date | undefined;
  private _tempEndDate: Date | undefined;

  constructor() {
    this._route.queryParams
      .pipe(takeUntilDestroyed())
      .subscribe((params: Params) => {
        this.$hasQueryParams.set(!!Object.keys(params).length);

        // Sync Form Fields
        const searchParams = deserializeSearchParams(params);
        this.$pageSize.set(searchParams.count);
        this.$pageIndex.set(searchParams.skip / searchParams.count);
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

    this.mobileQuery = this._media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  endDateChanged(endDate: Date) {
    this._tempEndDate = endDate;
    this.updateDateRange();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
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

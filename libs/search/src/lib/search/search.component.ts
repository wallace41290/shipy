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
} from '@shipy/models';
import { MatTableModule } from '@angular/material/table';
import { SearchFiltersComponent } from '@shipy/ui';

// TODO: dates
// TODO: pagination
// TODO: num nights
// TODO: ships
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

  selectedPorts: Port[] = [];
  ports = Port.values;

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

  constructor() {
    this._route.queryParams
      .pipe(takeUntilDestroyed())
      .subscribe((params: Params) => {
        // Sync Form Fields
        const searchParams = deserializeSearchParams(params);
        this.selectedPorts = deserializePorts(searchParams.departurePort);

        this.search(
          searchParams.departurePort,
          searchParams.startDate,
          searchParams.count,
          searchParams.skip
        );
      });
  }

  search(
    departurePort: string,
    startDate: string,
    count: number,
    skip: number
  ) {
    this._cruiseSearchService
      .search(departurePort, startDate, count, skip)
      .subscribe((response) => this.searchResponse$.next(response));
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
}

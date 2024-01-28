import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { CruiseSearchService } from '@shipy/data-access';
import { BehaviorSubject } from 'rxjs';
import { CruiseSearchResponse } from '@shipy/data-access';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { deserializeSearchParams } from './util';

@Component({
  selector: 'shipy-search',
  standalone: true,
  imports: [CommonModule, NgIf, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private cruiseSearchService = inject(CruiseSearchService);
  private route = inject(ActivatedRoute);

  searchResponse$ = new BehaviorSubject<CruiseSearchResponse | undefined>(
    undefined
  );

  constructor(){
    this.route.queryParams
      .pipe(takeUntilDestroyed())
      .subscribe((params: Params) => {
        const searchParams = deserializeSearchParams(params);
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
    this.cruiseSearchService
      .search(departurePort, startDate, count, skip)
      .subscribe((response) => this.searchResponse$.next(response));
  }
}

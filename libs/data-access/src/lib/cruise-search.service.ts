import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CruiseSearchRequest } from './models/request';
import * as Queries from './queries';
import * as Operations from './operations';
import { CruiseSearchResponse, CruiseSort } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CruiseSearchService {
  API_URL = 'https://www.royalcaribbean.com';

  constructor(private http: HttpClient) {}

  search(
    departurePort: string,
    startDate: string,
    count: number,
    skip: number,
    sortBy: CruiseSort['by'],
    sortOrder?: CruiseSort['order'],
    ship?: string,
    nights?: string
  ): Observable<CruiseSearchResponse> {
    // nights:2~5,6~8,gte12
    let filters = `departurePort:${departurePort}|startDate:${startDate}`;
    if (nights?.length) {
      filters += `|nights:${nights}`;
    }
    if (ship?.length) {
      filters += `|ship:${ship}`;
    }

    const search: CruiseSearchRequest = {
      operationName: Operations.CRUISE_SEARCH_CRUISES,
      query: Queries.CRUISE_SEARCH_CRUISES,
      variables: {
        filters,
        pagination: {
          count,
          skip,
        },
        sort: {
          by: sortBy,
          order: sortOrder,
        },
      },
    };
    return this.http.post<CruiseSearchResponse>(
      `${this.API_URL}/graph`,
      search
    );
  }
}

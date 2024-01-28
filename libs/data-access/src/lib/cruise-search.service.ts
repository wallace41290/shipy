import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CruiseSearchRequest } from './models/request';
import * as Queries from './queries';
import * as Operations from './operations';
import { CruiseSearchResponse } from './models';
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
    skip: number
  ): Observable<CruiseSearchResponse> {
    const search: CruiseSearchRequest = {
      operationName: Operations.CRUISE_SEARCH_CRUISES,
      query: Queries.CRUISE_SEARCH_CRUISES,
      variables: {
        filters: `departurePort:${departurePort}|startDate:${startDate}`,
        pagination: {
          count,
          skip,
        },
        sort: {
          by: 'RECOMMENDED',
        },
      },
    };
    return this.http.post<CruiseSearchResponse>(
      `${this.API_URL}/graph`,
      search
    );
  }
}

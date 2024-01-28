import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CruiseSearchRequest } from './models/request';
import * as Queries from './queries';
import * as Operations from './queries';
import { CruiseSearchResponse } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CruiseSearchService {
  API_URL = 'https://www.royalcaribbean.com';

  constructor(private http: HttpClient) {}

  search():Observable<CruiseSearchResponse> {
    const search: CruiseSearchRequest = {
      operationName: Operations.CRUISE_SEARCH_CRUISES,
      query: Queries.CRUISE_SEARCH_CRUISES,
      variables: {
        filters: 'departurePort:PCN|startDate:2024-10-01~2024-10-31',
        pagination: {
          count: 10,
          skip: 0,
        },
        sort: {
          by: 'RECOMMENDED',
        },
      },
    };
    return this.http.post<CruiseSearchResponse>(`${this.API_URL}/graph`,search);
  }
}

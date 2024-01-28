export interface SearchParams {
  departurePort: string;
  /** In the range like 2024-10-01~2024-10-31 */
  startDate: string;
  count: number;
  skip: number;
}

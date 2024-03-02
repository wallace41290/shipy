export interface SearchParams {
  departurePort: string;
  /** In the range like 2024-10-01~2024-10-31 */
  startDate: string;
  /** In the format like 2~5,9~11 */
  nights?:string;
  count: number;
  skip: number;
}

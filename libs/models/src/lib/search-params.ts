export interface SearchParams {
  count: number;
  departurePort: string;
  /** In the format like 2~5,9~11 */
  nights?: string;
  /** In the format like AN,RD */
  ship?: string;
  skip: number;
  /** RECOMMENDED, PRICE, NIGHTS */
  sortBy: string;
  /** ASC or DESC */
  sortOrder?: string;
  /** In the range like 2024-10-01~2024-10-31 */
  startDate: string;
}

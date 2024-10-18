import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { coerceSortDirection } from '@shipy/models';

@Pipe({
  name: 'toSortDirection',
  standalone: true,
})
export class ToSortDirectionPipe implements PipeTransform {
  transform(value: unknown): SortDirection {
    return coerceSortDirection(value);
  }
}

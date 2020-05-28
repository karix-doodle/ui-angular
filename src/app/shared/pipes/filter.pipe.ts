import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(items: any, searchText: string, filterId: number): any {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    if (filterId === 1) {
      return items.filter(value => {
        return value.gw_id.toLowerCase().includes(searchText)
          || value.gw_name.toLowerCase().includes(searchText);
      });
    } else {
      return null;
    }

  }

}

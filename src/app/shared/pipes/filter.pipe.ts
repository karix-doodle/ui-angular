import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: any): any[] {

    if (!items) return [];
    if (!field) return items;

    let filterKeys = Object.keys(field);

    return items.filter(item => {
      return filterKeys.some((keyName) => {
        return new RegExp(field[keyName], 'gi').test(item[keyName]) || field[keyName] === "" || field[keyName] === null;
      });
    });
  }

}

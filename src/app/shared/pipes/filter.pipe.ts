import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: any, filterId?: number): any[] {
    if (!items) { return []; }
    if (!field) { return items; }

    if (filterId === 1) { // RmLcrComponent search box B/C gateway search
      const searchText = field.toLowerCase();
      return items.filter(it => {
        return it.country.toLowerCase().includes(searchText)
          || it.mcc.toString().toLowerCase().includes(searchText)
          || it.direct.find(({ gw_id }) => gw_id.toLowerCase().includes(searchText))
          || it.premium.find(({ gw_id }) => gw_id.toLowerCase().includes(searchText))
          || it.wholesale.find(({ gw_id }) => gw_id.toLowerCase().includes(searchText))
          || it.nonlcr.find(({ gw_id }) => gw_id.toLowerCase().includes(searchText));
      });
    } else {
      const filterKeys = Object.keys(field);
      return items.filter(item => {
        return filterKeys.some((keyName) => {
          const value = field[keyName];
          let searchText = '';
          if (value !== undefined) { searchText = value.toLowerCase(); }
          return new RegExp(searchText).test(item[keyName].toString().toLowerCase()) || searchText === '' || searchText === null;
        });
      });
    }

  }

  /**
   * Check whether the value is a JavaScript number.
   *
   * First checks typeof, then self-equality to make sure it is
   * not NaN, then for equality to Infinity or -Infinity.
   *
   * @param value - The value to check
   * @return boolean Whether that value is a number
   */
  private isNumber = (value) => typeof value === 'number' && value === value && value !== Infinity && value !== -Infinity


}

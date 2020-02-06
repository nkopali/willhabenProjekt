import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  temp:any;
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    this.temp = items;

    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return this.temp.filter(it => {
      return it.descrip.toLocaleLowerCase().includes(searchText);
    });
  }
}

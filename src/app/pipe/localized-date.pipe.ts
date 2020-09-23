import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {
  constructor() {
  }

  /**
   * @param value any
   * @param pattern string
   * @return any
   */
  public transform(value: any, pattern: string = 'mediumDate'): any {
    const datePipe: DatePipe = new DatePipe('en');
    return datePipe.transform(value, pattern);
  }
}

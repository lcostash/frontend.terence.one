import {Injectable} from '@angular/core';
import {AjaxResponseInterface} from '../interface';
import {Subject} from 'rxjs';

@Injectable()
export class AdminService {
  public ToastrSubject = new Subject<AjaxResponseInterface>();

  constructor() {
  }
}

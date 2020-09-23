import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {CheckService} from '../../../service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
  providers: [CheckService]
})
export class CheckComponent {
  @Input() private control: AbstractControl;

  /**
   * @param checkService CheckService
   */
  constructor(private checkService: CheckService) {
  }

  /**
   * @since 0.0.1
   * @return string|null
   */
  public get message(): string | null {
    if (this.control) {
      for (const field in this.control.errors) {
        if (this.control.errors.hasOwnProperty(field)) {
          if (field === 'beError' && this.control.errors[field] !== '') {
            return this.control.errors[field];
          }
          if (this.control.dirty || this.control.touched) {
            return this.checkService.message(field, this.control.errors[field]);
          }
        }
      }
    }

    return null;
  }
}

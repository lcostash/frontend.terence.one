import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ConfirmButtonInterface} from '../../../interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Output() public chosen: EventEmitter<any> = new EventEmitter();
  public option: { message: string; actions: Array<ConfirmButtonInterface> };

  /**
   * @param bsModalRef BsModalRef
   */
  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  /**
   * @since 0.0.1
   * @param action any
   * @return void
   */
  public onAction(action: any): void {
    this.chosen.emit(action);
    this.bsModalRef.hide();
  }

  /**
   * @since 0.0.1
   * @param index number
   * @param button ConfirmButtonInterface
   * @return number
   */
  public sortButtons(index: number, button: ConfirmButtonInterface): number {
    return button.position;
  }
}

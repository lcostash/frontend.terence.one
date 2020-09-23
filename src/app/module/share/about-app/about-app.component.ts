import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.component.html',
  styleUrls: ['./about-app.component.scss']
})
export class AboutAppComponent implements OnInit {
  public version = environment.app.version;

  /**
   * @param bsModalRef BsModalRef
   */
  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }
}

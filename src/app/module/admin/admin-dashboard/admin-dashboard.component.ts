import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AjaxResponseInterface} from '../../../interface';
import {AdminService} from '../../../service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private messageSubscription: Subscription;

  /**
   * @param adminService AdminService
   * @param toastrService ToastrService
   */
  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.messageSubscription = this.adminService.ToastrSubject.subscribe((response: AjaxResponseInterface) => {
      if (response && response.message && response.message.length !== 0) {
        if (response.status === 200) {
          this.toastrService.success(response.message, 'Request Accepted');
        } else if (response.status === 400) {
          this.toastrService.warning(response.message, 'Something Wrong');
        } else {
          this.toastrService.error(response.message, 'Something Wrong');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}

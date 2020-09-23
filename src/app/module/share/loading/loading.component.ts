import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() public background = true;
  private delay = 500;
  private show: boolean;
  private timer: any;

  @Input() public set display(value: boolean) {
    this.show = false;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show = value, this.delay);
  }

  public get display(): boolean {
    return this.show;
  }

  ngOnInit(): void {
  }
}

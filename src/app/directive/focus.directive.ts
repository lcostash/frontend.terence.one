import {Directive, Input, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {
  @Input() public appFocus: boolean;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.appFocus) {
      this.element.nativeElement.focus();
    }
  }
}

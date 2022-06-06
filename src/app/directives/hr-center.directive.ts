import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHrCenter]'
})
export class HrCenterDirective {
  constructor() { }
  @HostBinding('class') class = 'hr-center';
  @HostBinding('style.width') @Input() widthLine: string = '';
}

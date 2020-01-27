import { Component, Input, ViewEncapsulation, HostBinding, Self, Optional, OnInit } from '@angular/core';
import { NgControl, ControlValueAccessor, FormGroupDirective, AbstractControl } from '@angular/forms';

let nextUniqueId = 0;

@Component({
  selector: 'lib-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorMessageComponent implements ControlValueAccessor, OnInit {
  @Input() control: AbstractControl;
  @Input() key: string;
  @HostBinding() id = `lib-error-message-${nextUniqueId++}`;
  @HostBinding('class') cssClass = 'lib-error-message';

  constructor(@Optional() @Self() public ctrlDir: NgControl, @Optional() public ctrlContainer: FormGroupDirective) {
    if (this.ctrlDir) {
      this.ctrlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.control = this.control || (this.ctrlDir && this.ctrlDir.control);
  }

  onChange(event) {}
  onTouched() {}
  writeValue(obj: any) {}
  registerOnChange(fn: any) {}
  registerOnTouched(fn: any) {}
  setDisabledState(isDisabled: boolean): void {}
}

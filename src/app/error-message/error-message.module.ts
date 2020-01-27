import { NgModule } from '@angular/core';

import { ErrorMessageComponent } from './error-message.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [ErrorMessageComponent]
})
export class ErrorMessageModule {}

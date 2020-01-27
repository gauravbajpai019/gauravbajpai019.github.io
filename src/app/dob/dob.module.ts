import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { DobComponent } from './dob.component';


// const CORE_LIB_MODULES = [AAErrorMessageModule, AAHintModule];

@NgModule({
  declarations: [DobComponent],
 imports: [CommonModule, FormsModule, ReactiveFormsModule,  ErrorMessageModule, NgbModule],
  exports: [DobComponent]
})
export class LibDobModule {}

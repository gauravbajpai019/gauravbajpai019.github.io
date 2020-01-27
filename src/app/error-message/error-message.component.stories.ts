import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageModule } from './error-message.module';

const formBuilder = new FormBuilder();

const parentForm = formBuilder.group(
  {
    firstName: ['', Validators.required],
    numberField: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    testGroup: formBuilder.group({
      field1: [''],
      field2: ['']
    })
  },
  { updateOn: 'change' }
);

storiesOf('Base | Error message', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, ErrorMessageModule]
    })
  )
  .add('Default', () => ({
    props: {
      parentForm,
      onSubmitForm: () => {
        Object.entries(parentForm.controls).forEach(entry => {
          entry[1].markAsTouched();
        });
      }
    },
    template: `
        <form novalidate autocomplete="off" #frm="ngForm" [formGroup]="parentForm" (ngSubmit)="onSubmitForm()">

          <div class="form-group">
            <label for="firstName">First name (Required)</label>
            <input id="firstName" type="text" class="form-control" placeholder="Enter your first name" formControlName="firstName" />

            <lib-error-message formControlName="firstName" key="required">Please enter your first name.</lib-error-message>
          </div>

          <div class="form-group">
            <label for="surname">Number (Min(1) & Max(5))</label>
            <input id="surname" type="number" class="form-control" placeholder="Enter a number"
             #numberFieldCtrl="ngForm" [formControl]="parentForm.get('numberField')" />

            <lib-error-message formControlName="numberField" key="required">Please enter a number.</lib-error-message>
            <lib-error-message formControlName="numberField" key="min">Allowed minimum value is 0</lib-error-message>
            <lib-error-message [formControl]="parentForm.get('numberField')" key="max">Allowed maximum value is 9</lib-error-message>
            <lib-error-message [control]="parentForm.get('testGroup')"
             key="required">Please enter a number (another related error message).</lib-error-message>

          </div>

          <button type="submit">Submit</button>

        </form>
    `
  }));


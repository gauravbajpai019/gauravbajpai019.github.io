import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { moduleMetadata, storiesOf } from '@storybook/angular';


import { LibDobModule } from './dob.module';


const parentForm = new FormBuilder().group({
  dob: [null, Validators.required],
  dobWithValue: ['2000-03-03T00:00:00.000Z', Validators.required]
});

storiesOf('Components | DOB', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [LibDobModule, ReactiveFormsModule]
    })
  )
  .add(
    'Default',
    () => {
      class TestComponent {}

      return {
        props: {
          parentForm
        },
        template: `
            <form novalidate autocomplete="off" [formGroup]="parentForm">
              <fieldset class="form-group">
                <legend class="label">Date of Birth</legend>

                <lib-dob id="date_of_Birth" class="form-control" [control]="parentForm.get('dob')"></lib-dob>
              </fieldset>
              <p *ngIf="parentForm.get('dob').value"> Selected value: {{ parentForm.get('dob').value | json }} </p>
            </form>
        `
      };
    },
    {
      notes: ``
    }
  );

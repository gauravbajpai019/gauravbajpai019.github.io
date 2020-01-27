import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup,
   FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import moment from 'moment/src/moment';

let nextUniqueId = 0;

@Component({
  selector: 'lib-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  encapsulation: ViewEncapsulation.None
})
export class DobComponent implements OnInit, OnChanges, OnDestroy {
  @Input() control: FormControl;
  @Input() dobFormat = 'YYYY-MM-DD';
  @Input() content = {};
  @Input() isRequired = true;

  @HostBinding('class') cssClass = 'lib-dob';

  private uniqueId = `lib-dob-${nextUniqueId++}`;

  dayInputId = `${this.uniqueId}-day`;
  monthInputId = `${this.uniqueId}-month`;
  yearInputId = `${this.uniqueId}-year`;
  dobFormGroupName = `${this.uniqueId}-dobForm`;

  dobForm: FormGroup;
  dobDayCtrl: AbstractControl;
  dobMonthCtrl: AbstractControl;
  dobYearCtrl: AbstractControl;

  internalIsRequired = this.isRequired;
  internalContent: any = {};
  defaultContent = {
    day: {
      errorMessages: {
        required: 'Enter a valid day',
        pattern: 'Check the day'
      }
    },
    month: {
      errorMessages: {
        required: 'Enter a valid month',
        pattern: 'Check the month'
      }
    },
    year: {
      errorMessages: {
        required: 'Enter a valid year',
        pattern: 'Check the year'
      }
    },
    errorMessages: {
      'invalid-dob': 'Check your date of birth'
    }
  };

  constructor(public ctrlContainer: FormGroupDirective, private formBuilder: FormBuilder) {
   // super();
  }

  ngOnInit() {
    Object.assign(this.internalContent, this.defaultContent, this.content);

    const initialDate = moment(this.control.value);

    let day = null;
    let month = null;
    let year = null;

    if (initialDate.isValid()) {
      day = initialDate.date().toString();
      month = (initialDate.month() + 1).toString();
      year = initialDate.year().toString();
    }

    this.dobForm = this.formBuilder.group(
      {
        dobDay: [day, [Validators.pattern(/^(([0][1-9]|[1-9])|[12]\d|3[01])$/)]],
        dobMonth: [month, [Validators.pattern(/^(([0][1-9]|[1-9])|1[0-2])$/)]],
        dobYear: [year, [Validators.pattern(/^\d{4}$/)]]
      },
      { updateOn: 'blur', validators: this.customDateValidator }
    );

    this.ctrlContainer.form.addControl(this.dobFormGroupName, this.dobForm);

    this.dobDayCtrl = this.dobForm.get('dobDay');
    this.dobMonthCtrl = this.dobForm.get('dobMonth');
    this.dobYearCtrl = this.dobForm.get('dobYear');

    this.dobForm.valueChanges.pipe().subscribe((change: any) => {
      let dateOfBirth = null;

      if (this.dobDayCtrl.value || this.dobMonthCtrl.value || this.dobYearCtrl.value) {
        this.internalIsRequired = true;
      } else {
        this.internalIsRequired = this.isRequired;
      }

      if (this.dobDayCtrl.valid && this.dobMonthCtrl.valid && this.dobYearCtrl.valid && this.dobForm.valid) {
        const date = moment([change.dobYear, change.dobMonth - 1, change.dobDay]);

        if (date.isValid()) {
          dateOfBirth = moment(date).format(this.dobFormat);
        }
      }
      this.control.setValue(dateOfBirth);

      // marking the main form control to be touched when a valid value is set, this is to
      // allow custom errors to display immediately after the value is updated
      this.control.markAsTouched();
    });

    // NOTE: This code takes care of the scenario, where the associated form control's
    // data is updated after this components initialization.
    this.control.valueChanges.pipe().subscribe(val => {
      const date = moment(this.control.value);

      if (date.isValid()) {
        this.dobDayCtrl.setValue(date.date().toString(), { emitEvent: false });
        this.dobMonthCtrl.setValue((date.month() + 1).toString(), { emitEvent: false });
        this.dobYearCtrl.setValue(date.year().toString(), { emitEvent: false });
      }
    });
  }

  ngOnChanges(changes) {
    this.internalIsRequired = this.isRequired;
  }

  ngOnDestroy() {
    this.ctrlContainer.form.removeControl(this.dobFormGroupName);
  }

  customDateValidator: ValidatorFn = (formGroupCtrl: FormGroup): ValidationErrors | null => {
    const dobDayCtrl = formGroupCtrl.get('dobDay');
    const dobMonthCtrl = formGroupCtrl.get('dobMonth');
    const dobYearCtrl = formGroupCtrl.get('dobYear');

    if (dobDayCtrl.value && dobMonthCtrl.value && dobYearCtrl.value) {
      const selectedDate = moment([dobYearCtrl.value, dobMonthCtrl.value - 1, dobDayCtrl.value]);
      if (!selectedDate.isValid() || selectedDate.isAfter(moment())) {
        return { 'invalid-dob': true };
      }
    }

    return null;
  };
}

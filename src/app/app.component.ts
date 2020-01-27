import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LibDobModule } from './../app/dob/dob.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 // parentForm: FormGroup;
  title = 'angular-example';


  ngOnInit() {

    // this.parentForm = new FormBuilder().group({
    //   dob: [null, Validators.required],
    //   dobWithValue: ['2000-03-03T00:00:00.000Z', Validators.required]
    // });

  }


}

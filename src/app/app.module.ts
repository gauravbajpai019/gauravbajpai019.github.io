import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibDobModule } from './dob/dob.module';
import { ErrorMessageModule } from './error-message/error-message.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LibDobModule,
    ErrorMessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

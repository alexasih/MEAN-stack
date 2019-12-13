import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends AppComponent {

  contactFormGroup = new FormGroup(
    {
      city:       new FormControl('', [Validators.required, Validators.minLength(1)]),
    }
  );

  ngOnInit() {
  }

  onSubmit() {
    console.log(`Sending ${this.contactFormGroup.value.city}`);
    return Array.of(this.contactFormGroup.value.city);
  }

}


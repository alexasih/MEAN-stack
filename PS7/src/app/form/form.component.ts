import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {RESULT} from '../models/resultModel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() results: RESULT[] = [];

  my: any = {
    city: ''
  }

  addWeather( ): void {
    let newWeather: RESULT = {
      city: this.contactFormGroup.value.city
    }
    this.apiService.addWeatherData(newWeather)
      .subscribe((data) => {
        console.log(`data: ${data.city}`);
        this.results.push(data.city);
        console.log(`Results: ${this.results}`)
      });
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  contactFormGroup = new FormGroup(
    {
      city:       new FormControl('', [Validators.required, Validators.minLength(1)]),
    }
  );

  // onSubmit() {
  //   return this.apiService.getWeatherResults();
  // }
}


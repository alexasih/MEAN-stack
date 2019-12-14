import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { RESULT } from './models/resultModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PS7 Weather App';
  private selectedResult: RESULT = null;
  results: RESULT[][] = [];

  getResults(): void {
    this.apiService.getWeatherResults()
      .subscribe(results => {
        this.results = Array.of(results);
      });
  }

  displayResults(result: RESULT) {
    this.selectedResult = result;
  }

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.getResults();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent extends AppComponent {
  @Input() results;

  ngOnInit() {
  }

}

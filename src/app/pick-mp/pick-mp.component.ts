import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-mp',
  templateUrl: './pick-mp.component.html',
  styleUrls: ['./pick-mp.component.css']
})
export class PickMpComponent implements OnInit {

  name: string;

  results: string[];

  constructor() { }

  ngOnInit() {
  }

  search(event) {
    this.results=[ 'Eastleigh' ];
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-mp',
  templateUrl: './pick-mp.component.html',
  styleUrls: ['./pick-mp.component.css']
})
export class PickMpComponent implements OnInit {

  found: boolean = false;
  name: string;

  constructor() { }

  ngOnInit() {
  }

  onChange(): void {
    this.found = true;
  }

}

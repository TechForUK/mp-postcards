import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write-card',
  templateUrl: './write-card.component.html',
  styleUrls: ['./write-card.component.css']
})
export class WriteCardComponent implements OnInit {

  mp: string = 'Mims Davies';
  card: string;
  name: string;
  email: string;

  constructor() { }

  ngOnInit() {
  }

}

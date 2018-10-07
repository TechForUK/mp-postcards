import { Component, OnInit } from '@angular/core';

import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-write-card',
  templateUrl: './write-card.component.html',
  styleUrls: ['./write-card.component.scss']
})
export class WriteCardComponent implements OnInit {

  mpName: string;
  card: string;
  name: string;
  email: string;

  constructor(private postcardStore: PostcardStoreService) { }

  ngOnInit() {
    this.postcardStore.postcard
      .subscribe(postcardData => this.mpName = postcardData.mp.name);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-write-card',
  templateUrl: './write-card.component.html',
  styleUrls: ['./write-card.component.scss']
})
export class WriteCardComponent implements OnInit {

  mpName: string;
  body: string;
  name: string;
  address: string;
  email: string;

  constructor(private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
    this.postcardStore.postcard
      .subscribe(postcardData => {
        if (postcardData.mp) {
          this.mpName = postcardData.mp.memberName;
        }
        this.body = postcardData.body;
        if (!this.body) {
          this.body = 'Dear ' + this.mpName + ',\n\n\n\nYours Sincerely,'
        }
        this.name = postcardData.name;
        this.address = postcardData.address;
        this.email = postcardData.email;
        console.log('MP', this.mpName);
        console.log('ADDRESS', this.address);
      });
  }

  next() {
    this.postcardStore.addPostcard(this.body, this.name, this.address, this.email);
    
    this.router.navigate(['/card-sent']);
  }
}

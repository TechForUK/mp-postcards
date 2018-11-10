import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-write-card',
  templateUrl: './write-card.component.html',
  styleUrls: ['./write-card.component.scss']
})
export class WriteCardComponent implements OnInit {

  example: string;
  mpName: string;
  message: string;
  name: string;
  address: string;
  email: string;

  constructor(private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
    this.postcardStore.postcard
      .subscribe(postcardData => {
        if (postcardData.topic) {
          this.example = postcardData.topic.example;
        }
        if (postcardData.mp) {
          this.mpName = postcardData.mp.memberName;
        }
        this.message = postcardData.message;
        if (!this.message) {
          this.message = 'Dear ' + this.mpName
        }
        this.name = postcardData.name;
        this.address = postcardData.address;
        this.email = postcardData.email;
      });
  }

  next() {
    this.postcardStore.addPostcard(this.message, this.name, this.address, this.email);
    
    this.router.navigate(['/confirm-send']);
  }
}

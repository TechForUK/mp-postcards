import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Postcard } from '../models/postcard';
import { PostcardApiService } from '../services/postcard-api.service';
import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-confirm-send',
  templateUrl: './confirm-send.component.html',
  styleUrls: ['./confirm-send.component.scss']
})
export class ConfirmSendComponent implements OnInit {

  postcardSending: boolean = false;

  postcard: Postcard;

  image: string;
  message: string;
  name: string;
  address: string;

  constructor(private postcardApi: PostcardApiService, private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
    this.postcardStore.postcard
      .subscribe(postcardData => {
        this.postcard = postcardData;

        if (postcardData.topic) {
          this.image = postcardData.topic.image;
        }
        this.message = postcardData.message;
        this.name = postcardData.name;
        this.address = postcardData.address;
      });
  }

  send() {
    this.postcardSending = true;
    this.postcardApi.submitPostcard(this.postcard).subscribe((response: any) => {
      if (response.submitted) {
        this.router.navigate(['/card-sent']);
      } else {
        this.postcardSending = false;
      }
    });
  }

}

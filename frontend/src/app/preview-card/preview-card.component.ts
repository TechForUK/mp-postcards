import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Postcard } from '../models/postcard';
import { PostcardApiService } from '../services/postcard-api.service';
import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {

  postcardSending: boolean = false;

  postcard: Postcard;

  constructor(private postcardApi: PostcardApiService, private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
    this.postcardStore.postcard
      .subscribe(postcardData => {
        this.postcard = postcardData;
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

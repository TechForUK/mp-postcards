import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Mp } from '../models/mp';
import { PostcardApiService } from '../services/postcard-api.service';
import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-pick-mp',
  templateUrl: './pick-mp.component.html',
  styleUrls: ['./pick-mp.component.scss']
})
export class PickMpComponent implements OnInit {

  postcode: string;

  selectedMp: Mp;

  results: Mp[];

  constructor(private postcardApi: PostcardApiService, private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
    this.postcardStore.postcard
      .subscribe(postcardData => this.selectedMp = postcardData.mp);
  }

  search(event) {
    let query = event.query;

    this.postcardApi.lookupMps(query)
      .subscribe((response: any) => {
        this.results = response.mps;
        if (response.postcodeLookup) {
          this.postcode = query;
        }
      });
  }

  next() {
    this.postcardStore.addMp(this.selectedMp, this.postcode);
    
    this.router.navigate(['/write-card']);
  }
}

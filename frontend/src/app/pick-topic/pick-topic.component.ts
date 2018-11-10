import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Topic } from '../models/topic';
import { PostcardStoreService } from '../state/postcard-store.service';

const TOPICS = [
  {
    id: 'nhs-topic',
    image: 'surgery-1807541_1920.jpg',
    name: 'NHS',
    description: 'Brexit postcard - NHS',
    example: 'I was in hospital earlier this year for an operation on my foot. One amazing nurse who looked after me was from Portugal, but said he\'s thinking about returning home because he doesn\'t know if he\'ll be able to work in the UK after we leave the EU. This worries me because we already don\'t have enough nurses.'
  },
  {
    id: 'cost-topic',
    image: 'supermarket-2158692_1920.jpg',
    name: 'Cost of living',
    description: 'Brexit postcard - Cost of living',
    example: 'As a father of two small children and the only person earning money in my family, I\'m noticing that our money just doesn\'t go as far as it used to. Supermarket prices have gone up since the Brexit vote, and I\'m worried how much higher prices might get after we leave the EU.'
  },
  {
    id: 'jobs-topic',
    image: 'welder-673559_1920.jpg',
    name: 'Jobs',
    description: 'Brexit postcard - Jobs',
    example: 'I have a son who is 19 and a daughter aged 15. My son has an apprenticeship in the motor industry, but we\'re already hearing stories that factories will shut down or reduce staff numbers because of Brexit. I\'m worried that there will be fewer opportunities for my daughter when she leaves school.'
  },
  {
    id: 'environment-topic',
    image: 'cry-stone-walls-2451428_1920.jpg',
    name: 'Environment',
    description: 'Brexit postcard - Environment',
    example: 'My baby son has asthma. We live in the city centre and air quality is a real worry. I heard that after Brexit we will no longer have EU laws about clean air, and I\'m worried that pollution will get worse and worse.'
  },
  {
    id: 'schools-topic',
    image: 'abacus-1866497_1920.jpg',
    name: 'Schools and education',
    description: 'Brexit postcard - Schools and education',
    example: 'I have a daughter and son aged 7 and 5. My daughter\'s class used to have an excellent teacher, a Swedish lady. A year ago she left - she told me it was because she wouldn\'t feel confident putting down roots here with all the uncertainty around Brexit. I heard my son\'s teacher, from Spain, is also thinking of leaving. It\'s a real worry that we\'re losing good teachers.'
  },
  {
    id: 'control-topic',
    image: 'london-90782_1920.jpg',
    name: 'Having our say',
    description: 'Brexit postcard - Having our say',
    example: 'I voted Brexit because I wanted to "take back control". But now I know more, it seems like we\'ll end up living by EU rules with no ability to vote on them. I feel like we\'ve been lied to. If politicians really wanted us to take control, they\'d let us have a final say on what happens now we know so much more than we did in 2016.'
  },
  {
    id: 'safety-topic',
    image: 'cctv-1144366_1920.jpg',
    name: 'Safety and security',
    description: 'Brexit postcard - Safety and security',
    example: 'Every time there\'s a terror attack in London, I\'m scared for my family and friends who live and work there. I trust our security services to do a good job, but I worry that after we leave the EU we\'ll be isolated and not able to share information with other countries to protect ourselves.'
  },
  {
    id: 'other-topic',
    image: 'pencil-918449_1920.jpg',
    name: 'Other',
    description: 'Brexit postcard',
    example: 'I was in hospital earlier this year for an operation on my foot. One amazing nurse who looked after me was from Portugal, but said he\'s thinking about returning home because he doesn\'t know if he\'ll be able to work in the UK after we leave the EU. This worries me because we already don\'t have enough nurses.'
  }
];

@Component({
  selector: 'app-pick-topic',
  templateUrl: './pick-topic.component.html',
  styleUrls: ['./pick-topic.component.scss']
})
export class PickTopicComponent implements OnInit {

  topics: Topic[] = TOPICS;

  constructor(private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
  }

  onSelect(topic: Topic): void {
    this.postcardStore.addTopic(topic);

    this.router.navigateByUrl('/pick-mp');
  }
}

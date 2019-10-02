import { Component, OnInit } from '@angular/core';
import { BandsService } from '../bands/bands.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public bandService: BandsService) {
  }

  ngOnInit() {
  }
  addBand() {
    this.bandService.addBand('fladjfladjflakjf', 'lfajdflajdflkjdalfkjasd ljf lfasdjfl jfklasdjfl');
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss']
})
export class BandComponent {
  constructor() {
  }
  bandCards = 10;
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BandsService } from './bands.service';


@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit, OnDestroy {
  bands;
  private bandsSub: Subscription;
  bandsJSON;
  iteration = 0;

  constructor(
    private router: Router,
    public bandsService: BandsService,
    public http: HttpClient) {
  }

  ngOnInit() {
    this.bandsService.getBands();
    this.http.get('assets/allBandInfo.json').subscribe(data => {
      this.bandsJSON = data;
    });

    this.bandsSub = this.bandsService.getBandUpdateListener()
      .subscribe((bands) => {
        this.bands = bands;
      });
  }

  bandCards = 10;

  navigateToPage(event) {
    console.log(event);
    if (event.target.localName !== "button") {
      this.router.navigate(['/bands/band', '10']);
    }
  }
  ngOnDestroy(): void {
    this.bandsSub.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BandsService } from './bands.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit, OnDestroy {
  bands;
  private bandsSub: Subscription;

  constructor(
    private router: Router,
    public bandsService: BandsService) {
  }

  ngOnInit() {
    this.bandsService.getBands();
    this.bandsSub = this.bandsService.getBandUpdateListener()
      .subscribe((bands) => {
        this.bands = bands;
      });
  }

  bandCards = 10;

  navigateToPage() {
    this.router.navigate(['/bands/band', '10']);
  }
  ngOnDestroy(): void {
    this.bandsSub.unsubscribe();
  }
}

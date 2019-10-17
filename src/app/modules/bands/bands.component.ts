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
  isLoading = false;
  bandsPerPage = 10;
  currentPage;
  bandsCount;



  constructor(
    private router: Router,
    public bandsService: BandsService,
    public http: HttpClient) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.bandsService.getBands(this.bandsPerPage, 1);
    this.bandsSub = this.bandsService.getBandUpdateListener()
      .subscribe((resp: any) => {
        this.bands = resp.bands;
        console.log(resp);
        this.bandsCount = resp.bandCount;
        this.isLoading = false;
      });
  }

  bandCards = 10;

  navigateToPage(event, id) {
    console.log(event);
    if (event.target.localName !== "button") {
      this.router.navigate(['/bands/band', id]);
    }
  }

  changeSize(event) {
    console.log(event, 'event');
    this.bandsService.getBands(+event, this.currentPage);
  }
  ngOnDestroy(): void {
    this.bandsSub.unsubscribe();
  }

  onChangePage(event) {
    const currentPage = event;
    this.currentPage = currentPage;
    this.bandsService.getBands(this.bandsPerPage, this.currentPage);
  }
}

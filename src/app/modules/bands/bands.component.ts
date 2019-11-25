import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { BandsService } from "./bands.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-bands",
  templateUrl: "./bands.component.html",
  styleUrls: ["./bands.component.scss"]
})
export class BandsComponent implements OnInit, OnDestroy {
  bands;
  isLoading = false;
  bandsPerPage = 12;
  currentPage;
  bandsCount;
  userIsAuthenticated = false;
  userId: string;
  bandsAmount;
  private bandsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private router: Router,
    public bandsService: BandsService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.bandsService.getBands(this.bandsPerPage, 1);
    this.userId = this.authService.getUserId();
    this.bandsSub = this.bandsService
      .getBandUpdateListener()
      .subscribe((resp: any) => {
        this.bands = resp.bands;
        this.bandsAmount = resp.bandCount;
        console.log(this.bandsAmount, 'amount')
        this.bandsCount = resp.bandCount - 1;
        this.isLoading = false;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  navigateToPage(event, id) {
    if (event.target.localName !== "button") {
      this.router.navigate(["/bands/band", id]);
    }
  }

  changeSize(event) {
    this.bandsService.getBands(+event, this.currentPage);
  }

  ngOnDestroy(): void {
    this.bandsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onChangePage(event) {
    this.isLoading = true;
    const currentPage = event;
    this.currentPage = currentPage - 1;
    this.bandsService.getBands(this.bandsPerPage, this.currentPage);
  }

  findBand(query) {
    this.bandsService.getBands(this.bandsPerPage, null, query);
  }
  resetSearchQuery(isRemovedQuery) {
    if(isRemovedQuery) {
        this.isLoading = true;
        this.bandsService.getBands(this.bandsPerPage, 1);
    }
  }
}

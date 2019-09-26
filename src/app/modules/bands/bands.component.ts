import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  bandCards = 10;

  navigateToPage() {
    this.router.navigate(['/bands/band', '10']);
  }
}

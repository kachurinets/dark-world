import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss']
})
export class BandComponent implements OnInit {
  constructor() {
  }
  bandCards = 10;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {

    this.galleryOptions = [
        { "image": false, "height": "100px" },
        { "breakpoint": 500, "width": "100%" }
      ];

    this.galleryImages = [
      {
        small: 'http://placehold.it/100x100/',
        medium: 'http://placehold.it/250x250/',
        big: 'http://placehold.it/250x250/'
      },
      {
        small: 'http://placehold.it/100x100/',
        medium: 'http://placehold.it/250x250/',
        big: 'http://placehold.it/250x250/'
      },
      {
        small: 'http://placehold.it/100x100/',
        medium: 'http://placehold.it/250x250/',
        big: 'http://placehold.it/250x250/'
      },
    ];
  }
}

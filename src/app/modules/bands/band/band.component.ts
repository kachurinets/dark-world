import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';

import { BandsService } from '../bands.service';
import { Band } from '../../../models/band.model';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss']
})
export class BandComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private bandsService: BandsService) {
  }
  bandCards = 10;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  private routeSub: Subscription;
  band: Band;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log(params['id']);
      this.bandsService.getBand(params['id']).subscribe(resp => {
        this.band = {
          id: resp._id,
          name: resp.name,
          info: resp.info,
          imagePath: resp.imagePath,
          genre: resp.genre,
          existence: resp.existence,
          country: resp.country,
          users: resp.users,
          albums: resp.albums,
        };
        console.log(this.band, 'band');
      });
    });

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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}

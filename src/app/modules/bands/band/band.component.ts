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
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    band: Band;
    isUnvisibleInfo: boolean;
    messageButton: string;
    private routeSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private bandsService: BandsService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.bandsService.getBand(params['id']).subscribe(resp => {
                console.log(resp, 'response');
                this.band = {
                    id: resp._id,
                    serialNumber: resp.serialNumber,
                    name: resp.name,
                    info: resp.info,
                    imagePath: resp.imagePath,
                    genre: resp.genre,
                    existence: resp.existence,
                    country: resp.country,
                    members: resp.members,
                    pastMembers: resp.pastMembers,
                    discography: resp.discography,
                    videography: resp.videography,
                };
                this.visibleInfo();
            });
        });

        this.galleryOptions = [
            {image: false, height: '100px'},
            {breakpoint: 500, width: '100%'}
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
            }
        ];
    }

    showMoreInfo() {
        this.isUnvisibleInfo = !this.isUnvisibleInfo;
        if (this.isUnvisibleInfo) {
            this.messageButton = 'Показать больше';
        } else {
            this.messageButton = 'Скрыть';

        }
    }

    visibleInfo() {
        if (this.band && this.band.info.length > 3000) {
            this.isUnvisibleInfo = true;
            this.messageButton = 'Показать больше';
        } else {
            this.isUnvisibleInfo = false;
            this.messageButton = 'Скрыть';
        }
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

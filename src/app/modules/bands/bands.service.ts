import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Band } from '../../models/band.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BandsService {
    private bands: any = [];
    private bandsUpdated = new Subject();

    constructor(private http: HttpClient, private router: Router) {
    }

    getBands(bandsPerPage: number, currentPage?: number, query = null) {
        const bandNameQuery = query && query.name ? query.name : '';
        const bandGenreQuery = query && query.genre ? query.genre : '';
        const bandCountryQuery = query &&  query.country ? query.country : '';
        const queryParams = `?pagesize=${bandsPerPage}&page=${currentPage}&name=${bandNameQuery}&country=${bandCountryQuery}&genre=${bandGenreQuery}`;
        this.http
            .get<{ message: string; bands: any; maxBands: number }>(
                `${environment.apiUrl}bands` + queryParams
            )
            .pipe(
                map(bandData => {
                    return {
                        bands: bandData.bands.map(band => {
                            return {
                                name: band.name,
                                info: band.info,
                                id: band._id,
                                imagePath: band.imagePath,
                                genre: band.genre,
                                existence: band.existence,
                                country: band.counry,
                                user: band.users,
                                albums: band.albums,
                                creator: band.creator
                            };
                        }),
                        maxBands: bandData.maxBands
                    };
                })
            )
            .subscribe(transformedBandData => {
                this.bands = transformedBandData.bands;
                this.bandsUpdated.next({
                    bands: [...this.bands],
                    bandCount: transformedBandData.maxBands
                });
            });
    }

    getBandUpdateListener() {
        return this.bandsUpdated.asObservable();
    }

    addBand(name: string, info: string, images: any) {
        const bandData = new FormData();
        for (const file of images) {
            bandData.append('image', file);
        }
        bandData.append('name', name);
        bandData.append('info', info);

        this.http
            .post(`${environment.apiUrl}bands`, bandData)
            .subscribe((resp: any) => {
                this.router.navigate(['/']);
            });
    }

    deletePost(bandId: string) {
        this.http
            .delete(`${environment.apiUrl}bands/` + bandId)
            .subscribe(() => {
                this.bands = this.bands.filter(band => band.id !== bandId);
            });
    }

    // todo: Заменить тип any
    getBand(id: string) {
        return this.http.get<any>(`${environment.apiUrl}bands/` + id);
    }

    updateBand(id: string, name: string, image: File | string, info) {
        let bandData: Band | FormData;
        if (typeof image === 'object') {
            bandData = new FormData();
            bandData.append('id', id);
            bandData.append('name', name);
            bandData.append('image', image, name);
            bandData.append('info', info);
        } else {
            bandData = {
                id: id,
                name: name,
                imagePath: image,
                info: info,
                creator: null
            };
        }
        this.http
            .put(`${environment.apiUrl}bands/` + id, bandData)
            .subscribe(response => {
                this.router.navigate(['/']);
            });
    }
}

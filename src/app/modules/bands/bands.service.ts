import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Band } from '../../models/band.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  constructor(private http: HttpClient) {}
  private bands: any = [];
  private bandsUpdated = new Subject();

  getBands() {
      this.http.get<{ message: string; bands: any }>(
        'http://localhost:3000/api/bands'
      )
        .pipe(map((bandData) => {
          return bandData.bands.map(band => {
            return {
              name: band.name,
              content: band.content,
              id: band._id,
            };
          });
        }))
        .subscribe((transformedBands) => {
          this.bands = transformedBands;
          this.bandsUpdated.next([...this.bands]);
        });
  }

  getBandUpdateListener() {
    return this.bandsUpdated.asObservable();
  }

  addBand(name: string, content: string) {
    const band = { id: null, name: name, content: content };
    this.http.post('http://localhost:3000/api/bands', band)
      .subscribe((resp: any) => {
        console.log(resp.message);
        band.id = resp.postId;
        this.bands.push(band);
        this.bandsUpdated.next([...this.bands]);
      });

  }

  deletePost(bandId: string) {
    this.http.delete("http://localhost:3000/api/bands/" + bandId)
      .subscribe(() => {
        this.bands = this.bands.filter(band => band.id !== bandId);
        this.bandsUpdated.next([...this.bands]);
      });
  }

}

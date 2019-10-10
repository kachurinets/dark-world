import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Band } from '../../models/band.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  constructor(
    private http: HttpClient,
    private router: Router) {}
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
              imagePath: band.imagePath
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

  addBand(name: string, content: string, image: File) {
    const bandData = new FormData();
    bandData.append('name', name);
    bandData.append("content", content);
    bandData.append("image", image, name );

    this.http.post('http://localhost:3000/api/bands', bandData)
      .subscribe((resp: any) => {
        const band: Band = {
          id: resp.band.id,
          name: name,
          content: content,
          imagePath: resp.band.imagePath
        };
        this.bands.push(band);
        this.bandsUpdated.next([...this.bands]);
        this.router.navigate(['/']);
      });

  }

  deletePost(bandId: string) {
    this.http.delete("http://localhost:3000/api/bands/" + bandId)
      .subscribe(() => {
        this.bands = this.bands.filter(band => band.id !== bandId);
        this.bandsUpdated.next([...this.bands]);
      });
  }

  getBand(id: string) {
    return this.http.get<{_id: string; name: string; content: string, imagePath: string}>('http://localhost:3000/api/bands/' + id);
  }

  updateBand(id: string, name: string, content: string, image: File | string) {
    let bandData: Band | FormData;
    if (typeof (image) === 'object') {
      bandData = new FormData();
      bandData.append("id", id);
      bandData.append('name', name);
      bandData.append('content', content);
      bandData.append('image', image, name);
    } else {
      bandData = {
        id: id,
        name: name,
        content: content,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/bands/' + id, bandData)
      .subscribe(response => {
        const updatedBands = [...this.bands];
        const oldBandIndex = updatedBands.findIndex(b => b.id === id);
        const band: Band = {
          id: id,
          name: name,
          content: content,
          imagePath: ''
        };
        updatedBands[oldBandIndex] = band;
        this.bands = updatedBands;
        this.bandsUpdated.next([...this.bands]);
        this.router.navigate(['/']);
      });
  }
}

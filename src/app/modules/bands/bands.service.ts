import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  constructor(private http: HttpClient) {}
  private bands: any = [];
  private bandsUpdated = new Subject();

  getBands() {
      this.http.get('http://localhost:3000/api/bands')
        .subscribe((postData: any) => {
          this.bands = postData.bands;
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
        this.bands.push(band);
        this.bandsUpdated.next([...this.bands]);
      });

  }

}

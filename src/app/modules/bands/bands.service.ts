import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  constructor(private http: HttpClient) {}
  private bands: any;
  private bandsUpdated = new Subject();

  getBands() {
      this.http.get('http://localhost:3000/api/posts')
        .subscribe((postData: any) => {
          this.bands = postData.posts;
          this.bandsUpdated.next([...this.bands]);
        });
  }

  getBandUpdateListener() {
    return this.bandsUpdated.asObservable();
  }

}

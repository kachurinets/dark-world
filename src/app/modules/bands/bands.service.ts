import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Band } from "../../models/band.model";

@Injectable({
  providedIn: "root"
})
export class BandsService {
  constructor(private http: HttpClient, private router: Router) {}

  private bands: any = [];
  private bandsUpdated = new Subject();

  getBands(bandsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${bandsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; bands: any; maxBands: number }>(
        "http://localhost:3000/api/bands" + queryParams
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

  addBand(name: string, info: string, image: File) {
    const bandData = new FormData();
    bandData.append("name", name);
    bandData.append("info", info);
    bandData.append("image", image, name);

    this.http
      .post("http://localhost:3000/api/bands", bandData)
      .subscribe((resp: any) => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(bandId: string) {
    this.http
      .delete("http://localhost:3000/api/bands/" + bandId)
      .subscribe(() => {
        this.bands = this.bands.filter(band => band.id !== bandId);
        this.bandsUpdated.next([...this.bands]);
      });
  }

  // todo: Заменить тип any
  getBand(id: string) {
    return this.http.get<any>("http://localhost:3000/api/bands/" + id);
  }

  updateBand(id: string, name: string, image: File | string) {
    let bandData: Band | FormData;
    if (typeof image === "object") {
      bandData = new FormData();
      bandData.append("id", id);
      bandData.append("name", name);
      bandData.append("image", image, name);
    } else {
      bandData = {
        id: id,
        name: name,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put("http://localhost:3000/api/bands/" + id, bandData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }
}

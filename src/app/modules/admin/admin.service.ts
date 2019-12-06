import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AdminService {
    constructor(private http: HttpClient) {}

    addGenre(genre) {
        return this.http.post(`${environment.apiUrl}general-config/genre`, genre);
    }

    getGenres() {
       return this.http.get(`${environment.apiUrl}general-config/genre`);
    }

    getCountries() {
        return this.http.get('assets/countries.json');
    }
}

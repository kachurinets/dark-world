import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AdminService {
    constructor(private http: HttpClient) {}

    addGenre(genre) {
        return this.http.post('http://localhost:3000/api/general-config/genre', genre);
    }

    getGenres() {
       return this.http.get('http://localhost:3000/api/general-config/genre');
    }

    getCountries() {
        return this.http.get('assets/countries.json');
    }
}

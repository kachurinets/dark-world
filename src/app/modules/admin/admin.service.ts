import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AdminService {
    constructor(private http: HttpClient) {}

    addGenre(genre: string) {

        const genreData = {name: genre};

        this.http.post('http://localhost:3000/api/general-config/genre', genreData).subscribe((resp) => {
            console.log(resp);
        }, error => {
            console.log(error);
        });
    }

    getGenres() {
       return this.http.get('http://localhost:3000/api/general-config/genre');
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AdminService {
    constructor(private http: HttpClient) {}

    addGenre(genre: string) {
        console.log(genre, 'test');
        this.http.post('http://localhost:3000/api/general-config/genre', genre).subscribe((resp) => {
            console.log(resp);
        }, error => {
            console.log(error);
        });
    }
}

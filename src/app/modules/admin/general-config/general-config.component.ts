import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-general-config',
    templateUrl: './general-config.component.html',
    styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit {
    genre: string;
    filesToUpload: Array<File> = [];
    genres;
    constructor(private adminService: AdminService, private http: HttpClient) {
    }

    ngOnInit(): void {


    }

    addGenre() {
        const genreData = {name: this.genre}
        this.adminService.addGenre(genreData).subscribe((resp) => {
            console.log(resp);
            this.genre = null;
        }, error => {
            console.log(error);
        });;
    }


    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;

        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i], files[i]['name']);
        }
        console.log('form data variable :   ' + formData.toString());
        this.http.post(`${environment.apiUrl}bands/add-image-loop`, formData).subscribe(resp => {
            console.log(resp);
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }

    parseDataFromDarkWorld() {
        this.http.get(`${environment.apiUrl}parser/parse-band-json`).subscribe(resp => {
            console.log(resp);
        });
    }

    parseImageBand() {
        this.http.get(`${environment.apiUrl}parser/parse-image`).subscribe(resp => {
            console.log(resp);
        });
    }

    saveBandsToStorage() {
        this.http.get(`${environment.apiUrl}parser/save-band-schema`).subscribe(resp => {
           console.log(resp);
        });
    }

    deleteAllBands() {
        this.http.get(`${environment.apiUrl}general-config/delete-all-bands`).subscribe(resp => {
            console.log(resp);
        })
    }
}

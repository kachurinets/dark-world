import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-general-config',
    templateUrl: './general-config.component.html',
    styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit {
    genre: string;
    filesToUpload: Array<File> = [];

    constructor(private adminService: AdminService, private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    addGenre() {
        this.adminService.addGenre(this.genre);
    }

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;

        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i], files[i]['name']);
        }
        console.log('form data variable :   ' + formData.toString());
        this.http.post('http://localhost:3000/api/bands/add-image-loop', formData).subscribe(resp => {
            console.log(resp);
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }

    parseDataFromDarkWorld() {
        this.http.get('http://localhost:3000/api/parser/parse-band-json').subscribe(resp => {
            console.log(resp);
        });
    }

    parseImageBand() {
        this.http.get('http://localhost:3000/api/parser/parse-image').subscribe(resp => {
            console.log(resp);
        });
    }

    saveBandsToStorage() {
        this.http.get('http://localhost:3000/api/parser/save-band-schema').subscribe(resp => {
           console.log(resp);
        });
    }
}

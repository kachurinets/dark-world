import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../modules/admin/admin.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewChecked {
    title = 'dark-world';
    options;
    contries;
    selectedOption;
    selectedCountry;
    selectedGenre;
    sortOptions;

    constructor(private cdr: ChangeDetectorRef, private adminService: AdminService) {
    }

    ngAfterViewChecked() {
        // your code to update the model
        this.cdr.detectChanges();

    }

    ngOnInit(): void {
        this.selectedOption = this.options[0];
        this.sortOptions = [{name: 'по рейтингу'}, {name: 'по просмотрам'}];
        this.adminService.getGenres().subscribe((resp: any) => {
            this.contries = resp.genres;
        });

    }

    optionsGenres = (query: string) => {
        return new Promise((resolve, reject) => {
            this.adminService.getGenres().subscribe((res: any) => {
                resolve(res.genres);
            });
        });
    }

    optionsCountries = (query: string) => {
        return new Promise((resolve, reject) => {
            this.adminService.getCountries().subscribe((res: any) => {
                var myData = Object.keys(res).map(key => {
                    return res[key];
                });
                console.log(myData);
                resolve(myData);
            });
        });
    }

}

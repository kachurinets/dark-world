import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';

import { AdminService } from '../../modules/admin/admin.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewChecked {
    selectedCountry;
    selectedGenre;
    sortOptions;

    constructor(
        private cdr: ChangeDetectorRef,
        private adminService: AdminService
    ) {
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit(): void {
        this.sortOptions = [{name: 'по рейтингу'}, {name: 'по просмотрам'}];
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
                const countries = Object.keys(res).map(key => {
                    return res[key];
                });
                resolve(countries);
            });
        });
    }
}

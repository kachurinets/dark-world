import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component, EventEmitter,
    OnInit, Output
} from '@angular/core';

import { AdminService } from '../../modules/admin/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewChecked {
    public form: FormGroup;
    selectedCountry;
    selectedGenre;
    sortOptions;
    @Output() searchQuery = new EventEmitter<any>();

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
        this.form = new FormGroup({
            name: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(2)]
            }),
            genre: new FormControl(null),
            country: new FormControl(null),
            sort: new FormControl(null)
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
                const countries = Object.keys(res).map(key => {
                    return res[key];
                });
                resolve(countries);
            });
        });
    }

    submit() {

        console.log(this.form.value, 'form');
        this.searchQuery.emit(this.form.value);
    }
}

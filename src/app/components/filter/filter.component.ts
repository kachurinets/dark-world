import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnInit, Output, SimpleChanges
} from '@angular/core';

import { AdminService } from '../../modules/admin/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewChecked, OnChanges {
    public form: FormGroup;
    sortOptions;
    @Output() searchQuery = new EventEmitter<any>();
    @Output() resetFilter = new EventEmitter<boolean>();
    @Input() bandsAmount;

    constructor(
        private cdr: ChangeDetectorRef,
        private adminService: AdminService
    ) {
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit(): void {
        console.log(this.bandsAmount);
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

    optionsGenres = (query: string, initial?) => {
        return new Promise((resolve, reject) => {
            this.adminService.getGenres().subscribe((res: any) => {
                if(query.length > 1) {
                    const genres = res.genres.filter((el) => {
                        if( el.name.includes(query) ) {
                            return el;
                        }
                    });
                    resolve(genres);
                } else {
                    resolve(res.genres);
                }
            });
        });
    }

    optionsCountries = (query: string) => {
        return new Promise((resolve, reject) => {
            this.adminService.getCountries().subscribe((res: any) => {
                if (query.length > 1) {
                    const keys = Object.keys(res).filter(key => {
                        if (res[key].name.includes(query)) {
                            return key;
                        }
                    });
                    const countries = keys.map(key => {
                        return res[key];
                    });
                    resolve(countries);
                } else {
                    const countries = Object.keys(res).map(key => {
                        return res[key];
                    });
                    resolve(countries);
                }
            });
        });
    }

    submit() {
        console.log(this.form.value, 'form');
        this.searchQuery.emit(this.form.value);
    }

    reset() {
        this.resetFilter.emit(true);
    }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-general-config',
    templateUrl: './general-config.component.html'
})
export class GeneralConfigComponent implements OnInit {
    genre: string;

    constructor(private adminService: AdminService,) {}
    ngOnInit(): void {
    }
    addGenre() {
        this.adminService.addGenre(this.genre);
    }
}

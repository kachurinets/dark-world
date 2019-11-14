import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared.module';
import { GeneralConfigComponent } from './general-config/general-config.component';
import { BandAdminComponent } from './band-admin/band-admin.component';

@NgModule({
    declarations: [
        AdminComponent,
        GeneralConfigComponent,
        BandAdminComponent,
    ],
    imports: [
        AdminRoutingModule,
        SharedModule
    ],
    providers: []
})
export class AdminModule {
}

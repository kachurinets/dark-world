import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GeneralConfigComponent } from './general-config/general-config.component';
import { BandAdminComponent } from './band-admin/band-admin.component';
import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    {
                        path: 'create',
                        component: BandAdminComponent
                    },
                    {
                        path: 'edit/:bandId',
                        component: BandAdminComponent
                    },
                    {
                        path: 'general-config',
                        component: GeneralConfigComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}

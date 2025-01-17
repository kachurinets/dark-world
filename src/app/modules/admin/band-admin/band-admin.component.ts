import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { BandsService } from '../../bands/bands.service';
import { Band } from '../../../models/band.model';

@Component({
    selector: 'app-band-admin',
    templateUrl: './band-admin.component.html',
    styleUrls: ['./band-admin.component.scss']
})
export class BandAdminComponent implements OnInit {
    public form: FormGroup;
    private mode = 'create';
    private bandId: string;
    private band: Band;
    public isLoading = false;
    public imagePreview: string | ArrayBuffer;
    public Editor = ClassicEditor;

    constructor(public bandService: BandsService, public route: ActivatedRoute) {
    }
    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            info: new FormControl(null, {validators: [Validators.required]}),
            image: new FormControl(null, {
                validators: [Validators.required]
            })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('bandId')) {
                this.mode = 'edit';
                this.bandId = paramMap.get('bandId');
                this.isLoading = true;
                this.bandService.getBand(this.bandId).subscribe(bandData => {
                    this.isLoading = false;
                    this.band = {
                        id: bandData._id,
                        name: bandData.name,
                        imagePath: bandData.imagePath,
                        info: bandData.info,
                        creator: bandData.creator
                    };
                    this.form.setValue({
                        name: this.band.name,
                        image: this.band.imagePath,
                        info: this.band.info,
                    });
                });
            } else {
                this.mode = 'create';
                this.bandId = null;
            }
        });
    }

    // todo: change name method and refactor forms
    addBand() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.bandService.addBand(
                this.form.value.name,
                this.form.value.info,
                this.form.value.image
            );
        } else {
            this.bandService.updateBand(
                this.bandId,
                this.form.value.name,
                this.form.value.image,
                this.form.value.info
            );
        }
        this.form.reset();
    }

      createParsedBand() {
            /*this.bandService.createParsedBand().subscribe(resp => console.log(resp));*/
          }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files;
        this.form.patchValue({image: file});
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BandsService } from '../bands/bands.service';
import { Band } from '../../models/band.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public form: FormGroup;
  private mode = 'create';
  private bandId: string;
  private band: Band;
  public isLoading = false;
  public imagePreview: string | ArrayBuffer;

  constructor(
    public bandService: BandsService,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators:  [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('bandId')) {
        this.mode = 'edit';
        this.bandId = paramMap.get('bandId');
        this.isLoading  = true;
        this.bandService.getBand(this.bandId)
          .subscribe(bandData => {
            this.isLoading = false;
            this.band = {
              id: bandData._id,
              name: bandData.name,
              content: bandData.content,
              imagePath: null
            };
            this.form.setValue({
              'name': this.band.name,
              'content': this.band.content
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
      this.bandService.addBand(this.form.value.name, this.form.value.content, this.form.value.image);
    } else {
      this.bandService.updateBand(this.bandId, this.form.value.name, this.form.value.name);
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BandsService } from '../bands/bands.service';
import { Band } from '../../models/band.model';

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

  constructor(
    public bandService: BandsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
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
            };
            this.form = this.formBuilder.group({
              name: this.band.name,
              content: this.band.content,
            });
          });

      } else {
        this.mode = 'create';
        this.bandId = null;
        this.form = this.formBuilder.group({
          name: '',
          content: '',
        });
      }
    });
  }

  //todo: change name method and refactor forms
  addBand() {
    this.isLoading = true;
    if (this.mode === 'create') {
      this.bandService.addBand(this.form.get('name').value, this.form.get('content').value);
    } else {
      this.bandService.updateBand(this.bandId, this.form.get('name').value, this.form.get('content').value);
    }

  }
}

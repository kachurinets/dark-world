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
        this.band = this.bandService.getBand(this.bandId);
      } else {
        this.mode = 'create';
        this.bandId = null;
      }
    });

    this.form = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  addBand() {
    this.bandService.addBand('fladjfladjflakjf', 'lfajdflajdflkjdalfkjasd ljf lfasdjfl jfklasdjfl');
  }
}

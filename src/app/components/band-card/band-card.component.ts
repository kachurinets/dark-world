import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { BandsService } from '../../modules/bands/bands.service';

@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.scss']
})
export class BandCardComponent implements OnInit, OnChanges {
  @Input() bandCard;

  constructor(
    private bandsService: BandsService,
    private router: Router) {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  onDelete(bandId: string) {
    this.bandsService.deletePost(bandId);
  }

  onEdit(bandId: string) {
    this.router.navigate(['/admin/edit', bandId]);
  }
}

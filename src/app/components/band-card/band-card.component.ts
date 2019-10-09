import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BandsService } from '../../modules/bands/bands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.scss']
})
export class BandCardComponent implements OnInit{
  @Input() bandCard;

  constructor(
    private bandsService: BandsService,
    private router: Router,) {

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

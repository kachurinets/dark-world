import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BandsService } from '../../modules/bands/bands.service';

@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.scss']
})
export class BandCardComponent implements OnInit{
  @Input() bandCard;

  constructor(private bandsService: BandsService) {

  }
  ngOnInit(): void {
    console.log(this.bandCard, 'btnCard');
  }

  onDelete(bandId: string) {
    this.bandsService.deletePost(bandId);
  }
}

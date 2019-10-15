import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent{
  title = 'dark-world';

  totalBands = 10;
  bandsPerPage = 2;
  bandsSizeOptions = [1, 2, 5, 10];

}

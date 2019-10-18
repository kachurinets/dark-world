import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {
  @Output() sizeBandsChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter();
  @Input() bandsCount;
  @Input() bandsPerPage;

  bands;
  options;
  selectedOption;

  ngOnInit(): void {
    this.options = [{number: '1'}, {number: '10'}];
    this.selectedOption =  this.options[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'changes');
  }

  changeBandsSize(event) {
    const size = event.number;
    console.log(size);
    this.sizeBandsChange.emit(size);
  }

  onChangePage(event) {
    this.pageChange.emit(event);
  }

}

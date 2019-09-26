import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewChecked{
  title = 'dark-world';
  options;
  contries;
  selectedOption;
  selectedCountry;
  constructor(private cdr: ChangeDetectorRef) { }
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.options = [{name: 'test'}, {name: 'test1'}];
    this.contries = [{name: 'Ukraine'}, {name: 'Moldova'}, {name: 'Russia'}];
    this.selectedOption =  this.options[0];
    this.selectedCountry = this.contries[0];
  }

}

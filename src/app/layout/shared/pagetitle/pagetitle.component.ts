import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html'
})
export class PagetitleComponent implements OnInit {

  @Input() breadcrumbItems: any;
  @Input() title: any;

  constructor() { }

  ngOnInit(): void {
  }

}

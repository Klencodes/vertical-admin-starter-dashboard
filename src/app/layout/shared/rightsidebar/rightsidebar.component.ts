import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html'
})
export class RightsidebarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }
}

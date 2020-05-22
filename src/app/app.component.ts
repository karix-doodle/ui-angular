import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'erp-international';
  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }
}

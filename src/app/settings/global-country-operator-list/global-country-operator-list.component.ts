import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-global-country-operator-list',
  templateUrl: './global-country-operator-list.component.html',
  styleUrls: ['./global-country-operator-list.component.css']
})
export class GlobalCountryOperatorListComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal) { }
  open(content) {
    this.modalService.open(content);
  }
  close(p) {

  }

  ngOnInit() { }

}

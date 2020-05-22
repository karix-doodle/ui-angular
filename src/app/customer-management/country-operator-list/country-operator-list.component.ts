import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-country-operator-list',
  templateUrl: './country-operator-list.component.html',
  styleUrls: ['./country-operator-list.component.css']
})
export class CountryOperatorListComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}

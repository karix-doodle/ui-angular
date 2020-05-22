import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css']
})
export class SettingsHomeComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
   // this.modalService.open(content);
    this.modalService.open(content,  { windowClass : "viewAudit"});
  }

  ngOnInit() {
  }

}

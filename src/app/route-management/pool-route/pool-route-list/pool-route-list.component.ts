import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pool-route-list',
  templateUrl: './pool-route-list.component.html',
  styleUrls: ['./pool-route-list.component.css',
                '../pool-route.component.css']
})
export class PoolRouteListComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {}
  
  open(content) {
   this.modalService.open(content);
   }

  ngOnInit() {
  }

}

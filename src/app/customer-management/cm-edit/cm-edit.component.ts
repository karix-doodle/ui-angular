import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cm-edit',
  templateUrl: './cm-edit.component.html',
  styleUrls: ['./cm-edit.component.css']
})
export class CmEditComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }
  private selectedLink: string="lcr";        
  
  setradio(e: string): void   
{  

      this.selectedLink = e;  
        
}  

  isSelected(name: string): boolean   
{  

      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
}  

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
}



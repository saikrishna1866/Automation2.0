import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatagenerationService } from 'src/app/services/data-service/datageneration.service';


@Component({
  selector: 'app-data-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.scss']
})
export class DataGeneratorComponent implements OnInit {

  dataTypes: string[] = [];

  formRows: number = 3;


  constructor() {

  }

  ngOnInit(): void {

  }

  increment(input: number){
    this.formRows +=1;
  }
  decrement(input: number){
    if(input < 1) return;
    this.formRows -=1;
  }
}

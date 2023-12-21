import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatagenerationService } from 'src/app/services/data-service/datageneration.service';


@Component({
  selector: 'app-data-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.scss']
})
export class DataGeneratorComponent implements OnInit {

  //store the data types
  dataTypes: string[] = [];

  //No of Rows in data generation form
  formRows: number = 2;

  //Index of a particular row
  rowIndex!: number;

  dataGenerationForm: FormGroup = this.fb.group({
    dataGenarateFormFields: this.fb.array([]),
    records: new FormControl(''),
    dataFormat: new FormControl('')
  })


  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.addNewRow();
  }

  // Increase and decrease no of rows
  increment(input: number) {
    this.formRows += 1;
  }
  decrement(input: number) {
    if (input < 1) return;
    this.formRows -= 1;
  }
  //

  //returns dataGenerateFormFields as form array
  dataGenerationFormFields(): FormArray {
    return this.dataGenerationForm.get("dataGenarateFormFields") as FormArray
  }

  //Form Group of DataGenerationFormField
  newDataGenerationFormField(): FormGroup {
    return this.fb.group({
      inputData: new FormControl(''),
      selectedDataType: new FormControl(null),
      dataTypeOptions: this.fb.array([])
    });
  }

  //Get Data Type options Fields
  getDataTypeOptionsFields(i: number): FormArray{
    return this.dataGenerationFormFields().at(i).get('dataTypeOptions') as FormArray;
  }

  //Generate the Data Type Form Field
  newDataTypeOptions(option: any){
    return this.fb.group({
      inputValue: new FormControl(option),
      optionValue: new FormControl(''),
      checked: new FormControl(''),
      displayTextField: new FormControl(true)
    });
  }

  //addNew Row to template
  addNewRow() {
    const formArray = this.dataGenerationForm.get('dataGenarateFormFields') as FormArray;

    if (formArray.length < 99) {
      for (let i = 0; i < this.formRows; i++) {
        const newRow = this.newDataGenerationFormField();
        formArray.push(newRow);
      }
    }
  }

  //Remove a Data Generate Row
  removeRow(i: number) {
    if (this.dataGenerationFormFields().controls.length == 1) return;
    this.dataGenerationFormFields().removeAt(i);
    if (this.dataGenerationFormFields().controls.length > i) {
      this.formRows = i + 1;
    }
  }

  //Gets Index of particular row
  getIndex(): number{
    return this.rowIndex;
  }



}

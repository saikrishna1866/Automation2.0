import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserData } from 'src/app/model/user-data.model';
import { DatagenerationService } from 'src/app/services/data-service/datageneration.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-data-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.scss']
})
export class DataGeneratorComponent implements OnInit {

  //store the data types
  dataTypes: string[] = [];

  // //No of Rows in data generation form
  // formRows: number = 2;

  //Index of a particular row
  rowIndex!: number;

  dataGenerationForm: FormGroup = this.fb.group({
    dataGenarateFormFields: this.fb.array([]),
    records: new FormControl(''),
    dataFormat: new FormControl(''),
    formRows: new FormControl(4)
  })


  constructor(private fb: FormBuilder, private dService: DatagenerationService) {

  }

  ngOnInit(): void {
    this.addNewRow();
    this.loadDataType();
  }

  // Increase and decrease no of rows
  increment() {
    const formRowsControl = this.dataGenerationForm.get('formRows') as FormControl;
    formRowsControl.setValue(formRowsControl.value + 1);
  }

  decrement() {
    const formRowsControl = this.dataGenerationForm.get('formRows') as FormControl;
    if (formRowsControl.value > 1) {
      formRowsControl.setValue(formRowsControl.value - 1);
    }
  }

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
  getDataTypeOptionsFields(i: number): FormArray {
    return this.dataGenerationFormFields().at(i).get('dataTypeOptions') as FormArray;
  }

  //Generate the Data Type Form Field
  newDataTypeOptions(option: any) {
    return this.fb.group({
      label: new FormControl(option),
      inputValue: new FormControl(''),
      optionValue: new FormControl(option),
      checked: new FormControl(''),
      displayTextField: new FormControl(true)
    });
  }

  //addNew Row to template
  addNewRow() {
    const formArray = this.dataGenerationForm.get('dataGenarateFormFields') as FormArray | null;
    const formRowsControl = this.dataGenerationForm.get('formRows') as FormControl | null;

    if (formArray && formRowsControl) {
      const numberOfNewRows = formRowsControl.value;

      // Ensure that the total number of rows does not exceed 99
      const remainingRowsToAdd = Math.min(99 - formArray.length, numberOfNewRows);

      for (let i = 0; i < remainingRowsToAdd; i++) {
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
      const formRowsControl = this.dataGenerationForm.get('formRows') as FormControl;
      formRowsControl.setValue(formRowsControl.value + 1);
      // this.formRows = i + 1;
    }
  }

  //Gets Index of particular row
  getIndex(): number {
    return this.rowIndex;
  }

  //get selected data type from select tag
  dataTypeSelected(event: any, i: number) {
    const selectedValue: any = event.target.value;
    this.rowIndex = i;
    console.log(selectedValue)
    this.getOptions(selectedValue, i);
  }

  //Get Data Types from API:
  private loadDataType() {
    this.dService.getDataTypeList().subscribe(x => {
      this.dataTypes = x;
      console.log(x);
    },
      err => {
        console.log("error", err)
      })
  }

  //Get Options from api
  getOptions(dataType: any, index: number) {
    this.dService.getDataTypeOptions(dataType).subscribe(
      data => {
        console.log(data);
        this.setDataTypeOptionsArrayForm(data, index);
      }
    )
  }

  //Set Data Type Options in Form Array
  setDataTypeOptionsArrayForm(dataTypeOptions: string[], index: number) {
    const dataTypeOptionsArray = this.dataGenerationFormFields().at(index)?.get("dataTypeOptions") as FormArray;
    dataTypeOptionsArray.clear();

    dataTypeOptions.forEach((option: any) => {
      const optionsForm = this.newDataTypeOptions(option);
      dataTypeOptionsArray.push(optionsForm);
    })
  }

  // Method to Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
    const formArray = this.dataGenerationFormFields();
    const controlsArray = formArray.controls;

    console.log('Before drop:', controlsArray);
    moveItemInArray(controlsArray, event.previousIndex, event.currentIndex);
    console.log('After drop:', controlsArray);
  }


  //Generating data
  onSubmit() {

    console.log(this.dataGenerationForm.value)

    let formData = this.dataGenerationForm.value;
    let userData: any = {};

    formData.dataGenarateFormFields.forEach((field: any) => {
      if (field.selectedDataType != null) {
        const options: any = {};

        field.dataTypeOptions.forEach((option: any) => {
          if (option.checked === true && option.optionValue !== undefined) {
            options[option.optionValue] = option.inputValue;
          }
        });

        options.data_type = field.selectedDataType;
        if (options.blank_space) {
          options.blank_space = Number(options.blank_space);
        }
        if (options.max_nb_chars) {
          options.max_nb_chars = Number(options.max_nb_chars);
        }
        if (options.num_alphabets) {
          options.num_alphabets = Number(options.num_alphabets);
        }
        if (options.num_numbers) {
          options.num_numbers = Number(options.num_numbers);
        }
        if (options.alphanumeric_percentage) {
          options.alphanumeric_percentage = Number(options.alphanumeric_percentage);
        }
        if (options.num_items) {
          options.num_items = Number(options.num_items);
        }
        if (options.max_nb_words) {
          options.max_nb_words = Number(options.max_nb_words);
        }
        if (options.alphanumeric) {
          options.alphanumeric = Number(options.alphanumeric);
        }
        userData[field.inputData] = options;
      }
    });

    const payLoad: UserData = {
      "num_records": formData.records,
      "user_data": userData,
      "data_format": formData.dataFormat
    };

    console.log(payLoad);

    this.dService.generateData(payLoad).subscribe(
      data => {
        this.generateFile(data, formData.dataFormat);
      },
      err => {
        console.log('Error Occurred while generating data', err);
      }
    )
  }

  generateFile(data: any, dataFormat: any) {
    if (dataFormat == 'JSON') {
      console.log("Gerarate Json Triggered");
      this.dService.downloadJson(data);
    }
    else if (dataFormat == 'CSV') {
      console.log("Gerarate CSV Triggered");
      this.dService.downloadCSV(data);
    }
  }
}

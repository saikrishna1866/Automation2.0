import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataGenerationService } from 'src/app/services/data-generation.service';

@Component({
  selector: 'app-data-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.scss']
})
export class DataGeneratorComponent implements OnInit {

  public dataGenerationForm!: FormGroup;
  dataLoading!: boolean
  dataTypes: string[] = [];
  rowIndex!: number;

  searchInputDataType!: string;

  constructor(private fb: FormBuilder, private DGService: DataGenerationService) { }

  ngOnInit(): void {
    this.dataGenerationForm = this.fb.group({
      dataGenerateFormFields: this.fb.array([]),
      numberOfRecords: new FormControl(''),
      dataFormat: new FormControl(''),
    });

    this.loadDataType();

  }

  //Loading Data types from service
  private loadDataType() {
    this.dataLoading = true;
    this.DGService.getDataTypeList().subscribe(x => {
      this.dataTypes = x;
      this.dataLoading = false;
    })
  }
  // Search
  onSearch(item: any) { }

  //generating new Form Fields
  dataGenerateFormFields(): FormArray {
    return this.dataGenerationForm.get("dataGenerateFormFields") as FormArray;
  }

  //Adding Options as fields to added form fields
  getDataTypeOptionsFields(i: number): FormArray {
    return this.dataGenerateFormFields().at(i).get("dataTypeOptions") as FormArray
  }

  //Checking if the data type is selected or not
  checkIfAnyDataTypeSelected(): boolean {
    return this.dataGenerateFormFields().controls.some(options => options.value.dataTypeOptions.length > 0);
  }


  //Checking if data type exists
  checkIfDataTypeOptionsExists(dataType: string, index: number): boolean {
    let rowData = this.dataGenerateFormFields().controls[index].value;
    if (rowData.selectedDataType === '') return false;
    else if (rowData.dataTypeOptions.length > 0) return true;
    return false;
  }

  //searchFor ng-select
  testSearch(term: string, item: any) {
    return item.startsWith(term);
  }

  //event to capture selected dataType
  public dataTypeSelected(dataType: string, index: number) {
    this.rowIndex = index;
    this.getOptions(dataType, index);
  }

  //Get Options from service
  private getOptions(dataType: string, index: number) {
    this.DGService.getDataTypeOptions(dataType).subscribe(
      data => {
        console.log(data);
        this.setDatatypeOptionsArrayForm(data, index);
      }
    )
  }

  //Setting Data Type to the Data Generate Form Field
  private setDatatypeOptionsArrayForm(dataTypeOptions: string[], index: number) {
    const dataTypeOptionsArray = this.dataGenerateFormFields().at(index)?.get("dataTypeOptions") as FormArray;

    dataTypeOptionsArray.clear();

    dataTypeOptions.forEach((option: any) => {
      const optionForm = this.newDataTypeOptions(option, this.displayInputText(option));
      dataTypeOptionsArray.push(optionForm)
    })
  }

  // This will return an options form array
  newDataTypeOptions(option: any, displayInput: boolean): FormGroup {
    return this.fb.group({
      label: new FormControl(option),
      inputValue: new FormControl(''),
      optionValue: new FormControl(option),
      checked: new FormControl(''),
      displayTextField: new FormControl(displayInput)
    });
  }

  //this will add a new Row for Data Generation Form
  newDataRow(): FormGroup {
    return this.fb.group({
      inputData: new FormControl(''),
      selectedDataType: new FormControl(null),
      dataTypeOptions: this.fb.array([])
    })
  }

  //checks if the displayInputText is valid or not
  displayInputText(option: string): boolean {
    let inputTextArr = [
      "Max Length", "Alphanumeric", "Num Alphabets", "Num Numbers",
      "Min Value", "Max Value", "Alphanumeric",
      "Max Chars", "Alphanumeric",
      "Max Words",
      "Phone Number Format",
      "Start Date", "End Date",
      "Num Items", "Fields and Types", "Blank Space"
    ];

    let newInputTextArr = [
      "choices",
      "start_date_str",
      "end_date_str",
      "min_num",
      "max_num",
      "min_value",
      "max_value",
      "max_nb_chars",
      "num_alphabets",
      "num_numbers",
      "alphanumeric",
      "alphanumeric_percentage",
      "max_nb_words",
      "blank_space",
      "phone_number_format",
      "num_items",
      "fields_and_types"
    ];

    return inputTextArr.includes(option) || newInputTextArr.includes(option);
  }



}

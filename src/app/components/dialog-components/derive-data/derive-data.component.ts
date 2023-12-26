import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatagenerationService } from 'src/app/services/data-service/datageneration.service';

@Component({
  selector: 'app-derive-data',
  templateUrl: './derive-data.component.html',
  styleUrls: ['./derive-data.component.scss']
})
export class DeriveDataComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<DeriveDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DGService: DatagenerationService) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  textArea!: string;

  submit() {
    let payload = {
      input_json_data: {} // Initialize input_json_data with an empty object
    };

    payload.input_json_data = JSON.parse(this.textArea);

    this.DGService.deriveFromExample(JSON.stringify(payload)).subscribe(
      data => {
        console.log('Success', data);
        console.log("From Dialog Component")
        this.dialogRef.close(data);
      },
      error => {
        console.error('Error', error);
        if (error && error.error && error.error.detail) {
          console.log('Error Detail', error.error.detail);
        }
      }
    );

  }
}

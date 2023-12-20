import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RenameComponent } from '../rename/rename.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<RenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{name: string}) {}


    onSaveClick(){
        this.dialogRef.close(true);
    }

    onCancelClick() {
      this.dialogRef.close();
    }

  ngOnInit(): void {
  }

}

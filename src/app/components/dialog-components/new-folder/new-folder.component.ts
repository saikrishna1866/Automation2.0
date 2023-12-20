import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {


  newName: string = '';
  showWarn: boolean = false;
  arr: string[] = [];

  constructor(public dialogRef: MatDialogRef<NewFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { children: string[], name: string }) { }


  onSaveClick() {
    if (this.newName) {
      this.dialogRef.close(this.newName);
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.showWarn) {
      this.onSaveClick();
    }

  }

  checkDuplicate() {
    if (this.arr.includes(this.newName)) {
      this.showWarn = true;
      console.log(this.showWarn);
    }
    else this.showWarn = false;
  }

  ngOnInit(): void {
  }

}

import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {
  arr: string[] = [];
  newName: string = '';
  showWarn: boolean = false;


  constructor(public dialogRef: MatDialogRef<NewFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { children: string[], name: string }) { }


  ngOnInit(): void {
    this.arr = this.data.children;
  }

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
    }
    else this.showWarn = false;
  }

}

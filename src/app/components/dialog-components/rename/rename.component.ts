import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.scss']
})
export class RenameComponent implements OnInit {


  newName: string = '';
  arr: string[] = [];
  showWarn: boolean = false;

  constructor(public dialogRef: MatDialogRef<RenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { children: string[], name: string, type: 'file' | 'folder' }) { }


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
      console.log(this.showWarn);
    }
    else this.showWarn = false;
  }

}

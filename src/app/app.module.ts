import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EditorComponent } from './components/editor/editor.component';
import { DataGeneratorComponent } from './components/data-generator/data-generator.component';

import { DeleteComponent } from './components/dialog-components/delete/delete.component';
import { NewFileComponent } from './components/dialog-components/new-file/new-file.component';
import { NewFolderComponent } from './components/dialog-components/new-folder/new-folder.component';
import { RenameComponent } from './components/dialog-components/rename/rename.component';
import { HttpClientModule } from '@angular/common/http';
import { DeriveDataComponent } from './components/dialog-components/derive-data/derive-data.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    DataGeneratorComponent,
    DeleteComponent,
    NewFileComponent,
    NewFolderComponent,
    RenameComponent,
    DeriveDataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MatIconModule,
    MatFormFieldModule,
    DragDropModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { HeaderComponent } from './components/header/header.component';
import { DataGeneratorComponent } from './components/data-generator/data-generator.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {
        path: '', component: EditorComponent, pathMatch: 'full' // Load EditorComponent by default
      },
      {
        path: 'editor', component: EditorComponent
      },
      {
        path: 'data-generator', component: DataGeneratorComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

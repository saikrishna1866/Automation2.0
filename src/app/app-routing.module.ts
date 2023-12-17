import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { HeaderComponent } from './components/header/header.component';

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
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

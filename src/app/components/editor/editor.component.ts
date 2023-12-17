import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource, } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree'
import { Project } from 'src/app/model/project.model';

import * as ace from "ace-builds";
import 'ace-builds/src-noconflict/ext-modelist';

const TREE_DATA: Project[] = [
  {
    name: 'Project1',
    type: 'Project',
    id: 1,
    children: [
      {
        name: 'Folder 1',
        type: 'Folder',
        id: 11,
        parentId: 1,
        children: [
          {
            name: 'SubFolder 1',
            type: 'Folder',
            parentId: 11,
            id: 111,
            children: [
              {
                name: 'File 1',
                type: 'File',
                id: 1111,
                parentId: 111,
                content: 'ABCD'
              }
            ]
          }
        ]
      },
      {
        name: 'Folder 2',
        type: 'Folder',
        id: 12,
        parentId: 1,
        children: [
          {
            name: 'File2',
            type: 'File',
            id: 112,
            parentId: 12,
            content: 'BCDEF'
          },
          {
            name: 'Folder3',
            type: 'Folder',
            id: 114,
            parentId: 12,
            children: [
              {
                name: 'File 4',
                type: 'File',
                content: 'CDEFG',
                parentId: 114,
                id: 1115
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Project2',
    type: 'Project',
    id: 2,
    children: [
      {
        name: 'Folder 21',
        type: 'Folder',
        id: 21,
        parentId: 2,
        children: [
          {
            name: 'File 21',
            type: 'File',
            id: 211,
            parentId: 21,
            content: 'WXYZ'
          }
        ]
      },
      {
        name: 'Folder 22',
        type: 'Folder',
        id: 22,
        parentId: 2,
        children: [
          {
            name: 'File 22',
            type: 'File',
            id: 222,
            parentId: 22,
            content: 'UVWX'
          }
        ]
      }
    ]
  },
  {
    name: 'Project3',
    type: 'Project',
    id: 3,
    children: [
      {
        name: 'Folder 31',
        type: 'Folder',
        id: 31,
        parentId: 3,
        children: [
          {
            name: 'SubFolder 31',
            type: 'Folder',
            parentId: 31,
            id: 311,
            children: [
              {
                name: 'File 31',
                type: 'File',
                id: 3111,
                parentId: 311,
                content: '1234'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Project4',
    type: 'Project',
    id: 4,
    children: [
      {
        name: 'Folder 41',
        type: 'Folder',
        id: 41,
        parentId: 4,
        children: [
          {
            name: 'File 41',
            type: 'File',
            id: 411,
            parentId: 41,
            content: '5678'
          }
        ]
      },
      {
        name: 'Folder 42',
        type: 'Folder',
        id: 42,
        parentId: 4,
        children: [
          {
            name: 'File 42',
            type: 'File',
            id: 422,
            parentId: 42,
            content: '9012'
          }
        ]
      }
    ]
  }
];


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  animations: [
    trigger('shrinkWidth', [
      state('expanded', style({
        width: '10rem',
      })),
      state('shrunken', style({
        width: '2.4rem',
      })),
      transition('expanded => shrunken', [
        animate('0.2s')
      ]),
      transition('shrunken => expanded', [
        animate('0.2s')
      ]),
    ]),
    trigger('shrinkMain', [
      state('expanded', style({
        width: 'calc(200vw - 8rem)',
      })),
      state('shrunken', style({
        width: 'calc(200vw - 2.4rem)',
      })),
      transition('expanded => shrunken', [
        animate('0.2s')
      ]),
      transition('shrunken => expanded', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class EditorComponent implements OnInit, AfterViewInit {

  constructor(private ref: ChangeDetectorRef) {
    this.dataSource.data = TREE_DATA;
  }


  hasChild = (_: number, node: Project) => !!node.children;

  ngOnInit(): void {
  }

  state: string = 'expanded';

  toggleMenu() {
    this.state = (this.state === 'expanded') ? 'shrunken' : 'expanded';
    console.log("pressed")
  }

  dataSource = new MatTreeNestedDataSource<Project>();
  treeControl = new NestedTreeControl<Project>(node => node.children);

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.24.0/src-noconflict');
    this.aceEditor = ace.edit(this.editor!.nativeElement);

    this.aceEditor.setTheme('ace/theme/Freckle');
    this.aceEditor.session.setMode('ace/mode/robot');
    this.aceEditor.setFontSize('12px');


    this.aceEditor.on("change", () => {
      console.log(this.aceEditor.getValue());
    });
  }

  @ViewChild('editor', {static: false}) private editor: ElementRef<HTMLElement> | undefined;

  private aceEditor!: ace.Ace.Editor;


}

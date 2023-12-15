import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('shrinkWidth', [
      state('expanded', style({
        width: '8rem',
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
    ])
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  state: string = 'expanded';

  toggleMenu() {
    this.state = (this.state === 'expanded') ? 'shrunken' : 'expanded';
    console.log("pressed")
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() activeScreen: AppScreen = 'activities';
  @Output() activeScreenChanged: EventEmitter<AppScreen> = new EventEmitter<AppScreen>();

  constructor() {}

  ngOnInit(): void {
  }

  setActiveAction(action: AppScreen): void {
    this.activeScreen = action;
    this.activeScreenChanged.emit(this.activeScreen);
  }

}

export type AppScreen = 'schedule' | 'activities' | 'finance' | 'product-lists' | 'settings';

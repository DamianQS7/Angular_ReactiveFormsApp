import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  
  public reactiveMenu: MenuItem[] = [
    { title: 'Basics', route: '/reactive/basic'},
    { title: 'Dynamics', route: '/reactive/dynamic'},
    { title: 'Switches', route: '/reactive/switches'}
  ];
  
  public authMenu: MenuItem[] = [
    { title: 'Register', route: '/auth'}
  ];

  public selectorsMenu: MenuItem[] = [
    { title: 'Selectors', route: '/selectors'}
  ];
}

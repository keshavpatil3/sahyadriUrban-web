import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {

  plainMenu: IMenuItem[] = [
    {
      name: 'Dashboard',
      type: 'link',
      icon: 'center_focus_strong',
      state: 'dashboard'
    },
    {
      name: 'Address',
      type: 'dropDown',
      tooltip: 'Address',
      icon: 'place',
      sub: [
        { name: 'State', state: 'address/state-list' },
        { name: 'District', state: 'address/district-list' },
        { name: 'Taluka', state: 'address/taluka-list' },
        { name: 'City', state: 'address/city-list' },
        { name: 'Location', state: 'address/location-list' },

      ]

    },
    {
      name: 'Religion & Caste',
      type: 'dropDown',
      tooltip: 'Address',
      icon: 'more',
      sub: [
        { name: 'Religion', state: 'religion/religion-list' },
        { name: 'Caste', state: 'religion/caste-list' },
         

      ]

    },
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.plainMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() { }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    // switch (menuType) {
    //   case 'separator-menu':
    //     this.menuItems.next(this.separatorMenu);
    //     break;
    //   case 'icon-menu':
    //     this.menuItems.next(this.iconMenu);
    //     break;
    //   default:
    //     this.menuItems.next(this.plainMenu);
    // }
  }
}

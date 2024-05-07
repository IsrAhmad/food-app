import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

//TODO: you can create an interface in the same file you're going to use it in if you will be only using it in that file. But you can still create aseparate file if you wish

interface IMenu {
  text: string;
  icon: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isExpanded: boolean = false;

  constructor(private _AutheService: AuthService) {}

  toggleSidebar(): void {

    this.isExpanded = !this.isExpanded;
  }

  isAdmin(): boolean {
    return this._AutheService.role == 'SuperAdmin' ? true : false;
  }

  isUser(): boolean {
    return this._AutheService.role == 'SystemUser' ? true : false;
  }

  menu: IMenu[] = [
    {
      text: 'Home',
      icon: 'fa-solid fa-home',
      link: this.isAdmin() ? '/dashboard/admin' : '/dashboard/user', //TODO: functions maybe?
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      text: 'Users',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      text: 'Admin Recipes',
      icon: 'fa-solid fa-book-bookmark',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      text: 'Categories',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      text: 'User Recipes',
      icon: 'fa-solid fa-book-bookmark',
      link: '/dashboard/user/user-recipes',
      isActive: this.isUser(),
    },
    {
      text: 'Favorites',
      icon: 'fa-regular fa-heart',
      link: '/dashboard/user/fav',
      isActive: this.isUser(),
    },
    {
      text: 'Change Password', //TODO: pop-up (use dialogue module from angular material - download angular material)
      icon: 'fa-solid fa-unlock-keyhole',
      link: '/dashboard/admin/change-password',
      isActive: this.isAdmin(),
    },
    {
      text: 'Logout', //TODO: pop-up (use dialogue module from angular material - download angular material)
      icon: 'fa-solid fa-sign-out',
      link: '' && localStorage.clear(),
      isActive: this.isAdmin() || this.isUser(),
    },
  ];
}

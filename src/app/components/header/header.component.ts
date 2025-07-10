import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDark = false;

  constructor() {
    // Load theme preference on init
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.setDarkTheme(true);
      this.isDark = true;
    } else {
      this.setDarkTheme(false);
      this.isDark = false;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.setDarkTheme(this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private setDarkTheme(enable: boolean) {
    if (enable) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}

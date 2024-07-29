import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pages-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pages-tabs.component.html',
  styleUrls: ['./pages-tabs.component.scss'],
})
export class PagesTabsComponent {}

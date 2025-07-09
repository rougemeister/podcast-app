import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './card.component.html',
  imports:[CommonModule],
  styleUrls: ['./card.component.scss'],
  standalone:true
})
export class StatsCardComponent {
  @Input() title = '';
  @Input() value: number | string = '';
  @Input() icon: string = ''; // Optional icon class or name
 
}

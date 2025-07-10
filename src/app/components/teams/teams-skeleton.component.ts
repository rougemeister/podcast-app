import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="teams-skeleton">
      <div class="skeleton-grid">
        @for (item of skeletonItems; track $index) {
          <div class="skeleton-card">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-value"></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .teams-skeleton {
      padding: 1rem;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }

    .skeleton-card {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      border-radius: 12px;
      background-color: #fff;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 1.5px 0 rgba(0,0,0,0.025), 0 0.5px 1px 0 rgba(0,0,0,0.015);
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .skeleton-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 8px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
      margin-right: 1rem;
    }

    .skeleton-content {
      flex: 1;
    }

    .skeleton-title {
      width: 60%;
      height: 1rem;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .skeleton-value {
      width: 40%;
      height: 1.75rem;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
      border-radius: 4px;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
  `]
})
export class TeamsSkeletonComponent {
  @Input() count: number = 6;
  
  get skeletonItems(): number[] {
    return Array(this.count).fill(0);
  }
} 
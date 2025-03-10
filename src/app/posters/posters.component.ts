import { Component, inject, Inject } from '@angular/core';
import { PostersPageComponent } from './posters-page/posters-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AppSessionService } from '../app-session.service';
import { PosterService } from './poster.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PosterDataTypes } from './posters.models';

@Component({
  selector: 'app-posters',
  standalone: true,
  imports: [PostersPageComponent, MatTabsModule, CommonModule],
  templateUrl: './posters.component.html',
  styleUrl: './posters.component.scss',
})
export class PostersComponent {
  private appSessionService = inject(AppSessionService);
  private posterService = inject(PosterService);
  posterTabLabels: PosterDataTypes[] = [
    PosterDataTypes.HEROS,
    PosterDataTypes.PLANETS,
    PosterDataTypes.STARSHIPS,
  ];

  constructor() {}
  ngOnInit() {
    this.appSessionService.setPostersLoaded(false);
    this.posterService.fetchPosterData().subscribe({
      error: (error) => console.error('Error fetching poster data:', error),
      complete: () => {
        this.appSessionService.setPostersLoaded(true);
      },
    });
  }
  getPosterLabel(label: string): string {
    return label === PosterDataTypes.HEROS ? 'Heros' : label;
  }
}

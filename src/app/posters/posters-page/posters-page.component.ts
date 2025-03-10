import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterCardComponent } from '../poster-card/poster-card.component';
import { PosterService } from '../poster.service';
import { PosterDataTypes } from '../posters.models';
import { AppSessionService } from '../../app-session.service';
@Component({
  selector: 'app-posters-page',
  standalone: true,
  imports: [CommonModule, PosterCardComponent],
  templateUrl: './posters-page.component.html',
  styleUrl: './posters-page.component.scss',
})
export class PostersPageComponent {
  @Input() dataType!: PosterDataTypes;
  private posterService = inject(PosterService);
  private appSessionService = inject(AppSessionService);
  isPostersLoadedData$ = this.appSessionService.getPostersLoaded$();
  posterData: any[] = [];

  constructor() {}

  ngOnInit() {
    this.posterService.getGalacticPosterData().subscribe((data) => {
      this.posterData = data[this.dataType];
    });

    /*switch (this.dataType) {
      case PosterDataTypes.HEROS:
        this.posterService.getPeoplePosterData$().subscribe((data) => {
          this.posterData = data;
        });
        break;
      case PosterDataTypes.PLANETS:
        this.posterService.planetsPosterData.subscribe((data) => {
          this.posterData = data;
        });
        break;
      case PosterDataTypes.STARSHIPS:
        this.posterService.starshipPosterData.subscribe((data) => {
          this.posterData = data;
        });
        break;
      default:
        this.posterService.peoplePosterData.subscribe((data) => {
          this.posterData = data;
        });
        break;
    }*/
  }
}

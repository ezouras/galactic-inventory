import {
  Component,
  inject,
  Input,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PosterService } from '../poster.service';
import { PosterDataTypes } from '../posters.models';
import { CartServiceService } from '../../cart-service.service';

@Component({
  selector: 'app-poster-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './poster-card.component.html',
  styleUrl: './poster-card.component.scss',
})
export class PosterCardComponent {
  @Input() posterData: any;
  posterService = inject(PosterService);
  cartService = inject(CartServiceService);
  addToCart() {
    this.cartService.addToCartTotal(this.posterData.type);
  }
}

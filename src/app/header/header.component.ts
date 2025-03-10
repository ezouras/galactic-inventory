import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { PosterService } from '../posters/poster.service';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private posterService = inject(PosterService);
  private cartService = inject(CartServiceService);
  total: number = 13.99;
  ngOnInit() {
    this.cartService.cartTotal.subscribe((data) => {
      console.log('EZ cart total is ', data);
      this.total = data;
    });
  }
}

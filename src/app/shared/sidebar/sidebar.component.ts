import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- LEFT COLUMN (filters, offers, cuisines) -->
    <aside class="w-full space-y-4 lg:sticky lg:top-36 lg:self-start">
      <div class="text-lg font-semibold text-gray-800">Filters</div>
      <div>
        <div class="text-sm font-medium text-gray-600 mb-2">Sort by</div>
        <ul class="space-y-1" id="sortOptionsList">
          @for (option of sortOptions; track option) {
          <li
            class="filter-option px-2 py-1.5 rounded-md cursor-pointer hover:bg-yellow-50 text-gray-700 flex items-center justify-between"
            [class.active]="layout.activeSort() === option" (click)="layout.activeSort.set(option)">
            <span>{{ option }}</span>
            <i class="fas fa-check text-custom-yellow-dark active-icon"></i>
          </li>
          }
        </ul>
      </div>
      <div>
        <div class="text-sm font-medium text-gray-600 mb-2">Quick filters</div>
        <div class="flex flex-wrap gap-2">
          <button
            class="chip border border-gray-300 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:border-custom-yellow hover:bg-yellow-50 bg-white shadow-sm flex items-center"
            [class.bg-yellow-100]="layout.quickFilters().get('ratings')"
            [class.border-custom-yellow]="layout.quickFilters().get('ratings')"
            [class.text-custom-yellow-dark]="layout.quickFilters().get('ratings')" (click)="layout.toggleQuickFilter('ratings')">
            <i class="fas fa-star text-custom-yellow mr-1.5"></i> Ratings 4+</button>
          <button
            class="chip border border-gray-300 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:border-custom-yellow hover:bg-yellow-50 bg-white shadow-sm flex items-center"
            [class.bg-yellow-100]="layout.quickFilters().get('super')"
            [class.border-custom-yellow]="layout.quickFilters().get('super')"
            [class.text-custom-yellow-dark]="layout.quickFilters().get('super')" (click)="layout.toggleQuickFilter('super')">
            <i class="fas fa-crown text-custom-yellow mr-1.5"></i> Super restaurant</button>
        </div>
      </div>


      <!-- OFFERS -->
      <div class="mt-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center"><i
            class="fas fa-tag text-custom-yellow mr-2"></i> Offers</h2>
        <div class="flex flex-wrap gap-2">
          @for (offer of offers; track offer) {
          <span
            class="chip border border-gray-300 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:border-custom-yellow hover:bg-yellow-50 bg-white shadow-sm"
            [class.bg-yellow-100]="layout.quickFilters().get(offer)" [class.border-custom-yellow]="layout.quickFilters().get(offer)"
            [class.text-custom-yellow-dark]="layout.quickFilters().get(offer)" (click)="layout.toggleQuickFilter(offer)">
            {{ offer }}
          </span>
          }
        </div>
      </div>

      <!-- DETAILED CUISINES -->
      <div class="mt-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center"><i
            class="fas fa-utensils text-custom-yellow mr-2"></i> Cuisines</h2>
        <div class="relative mb-4">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input type="text" placeholder="Search for cuisine"
            class="w-full border border-gray-200 rounded-full py-2 pl-8 pr-4 text-sm bg-white shadow-sm focus:ring-2 focus:ring-custom-yellow">
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          @for (cuisine of sideCuisines; track cuisine) {
          <span
            class="chip border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-custom-yellow hover:bg-yellow-50 bg-white shadow-sm cursor-pointer transition-all"
            [class.bg-yellow-100]="layout.selectedCuisine() === cuisine"
            [class.border-custom-yellow]="layout.selectedCuisine() === cuisine"
            [class.text-custom-yellow-dark]="layout.selectedCuisine() === cuisine"
            (click)="layout.toggleCuisine(cuisine)">
            {{ cuisine }}
          </span>
          }
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  public readonly sortOptions = [
    "Relevance", "Fastest delivery", "Distance", "Top rated", "Promotions", "Price: Low to High"
  ];

  public readonly offers = ["Free delivery", "Accepts vouchers", "Deals"];

  public readonly sideCuisines = [
    "American", "BBQ", "Beverages", "Biryani", "Broast", "Burgers", "Cakes & Bakery", "Chinese",
    "Fast Food", "Pizza", "Pakistani", "Halwa Puri", "Paratha"
  ];

  constructor(public layout: LayoutService) {}
}

import { Component, signal, computed, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LayoutService } from '../layout.service';
import { ProductService, Product } from '../product.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-pandamart-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './pandamart-offers.component.html',
  styleUrl: './pandamart-offers.component.css'
})
export class PandamartOffersComponent implements OnInit {
  public readonly layout = inject(LayoutService);
  public readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  
  public readonly products = signal<Product[]>([]);
  public readonly isLoading = signal(false);
  public readonly hasMore = signal(true);
  public readonly categoryTitle = signal('All Products');
  
  private currentCategory = 'all';
  private itemsLoaded = 0;
  private readonly ITEMS_PER_PAGE = 12;

  ngOnInit() {
    // Set active tab to pandamart when visiting this page
    this.layout.activeTab.set('pandamart');

    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'] || 'all';
      
      switch(this.currentCategory) {
        case 'exclusive': this.categoryTitle.set('Exclusive Deals'); break;
        case 'fresh': this.categoryTitle.set('Freshly Picked For You'); break;
        case 'pantry': this.categoryTitle.set('Pantry Essentials'); break;
        case 'snacks': this.categoryTitle.set('Snacks & Beverages'); break;
        case 'bakery': this.categoryTitle.set('Fresh Bakery'); break;
        case 'all': 
        default: this.categoryTitle.set('All Products'); break;
      }

      this.products.set([]);
      this.itemsLoaded = 0;
      this.hasMore.set(true);
      this.loadMore();
    });
  }

  public loadMore() {
    if (this.isLoading() || !this.hasMore()) return;
    
    this.isLoading.set(true);
    
    let categoryProducts: Product[] = [];
    
    switch(this.currentCategory) {
      case 'exclusive': categoryProducts = this.productService.exclusiveProducts || []; break;
      case 'fresh': categoryProducts = this.productService.freshProducts || []; break;
      case 'pantry': categoryProducts = this.productService.pantryProducts || []; break;
      case 'snacks': categoryProducts = this.productService.snackProducts || []; break;
      case 'bakery': categoryProducts = this.productService.bakeryProducts || []; break;
      case 'all': 
      default: 
        categoryProducts = this.productService.getAllProducts() || []; 
        break;
    }
    
    const nextItems = categoryProducts.slice(this.itemsLoaded, this.itemsLoaded + this.ITEMS_PER_PAGE);
    this.products.set([...this.products(), ...nextItems]);
    this.itemsLoaded += nextItems.length;
    
    this.hasMore.set(this.itemsLoaded < categoryProducts.length);
    this.isLoading.set(false);
  }

  public goBack() {
    this.router.navigate(['/']);
  }

  openProductDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
}

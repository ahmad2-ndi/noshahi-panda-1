import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../product.service';
import { LayoutService } from '../layout.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  public layout = inject(LayoutService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public product = signal<Product | undefined>(undefined);
  public relatedProducts = signal<Product[]>([]);
  public quantity = signal(1);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    const p = this.productService.getProductById(Number(id));
    if (p) {
      this.product.set(p);
      this.relatedProducts.set(this.productService.getRelatedProducts(p.category, p.id));
      // Reset quantity when changing products
      this.quantity.set(1);
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }

  incrementQuantity() {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart() {
    if (this.product()) {
      this.layout.addToCart(this.product()!, this.quantity());
    }
  }

  buyNow() {
    if (this.product()) {
      // Add current product to cart first
      this.layout.addToCart(this.product()!, this.quantity());
      // Navigate directly to checkout
      this.router.navigate(['/checkout']);
    }
  }
}

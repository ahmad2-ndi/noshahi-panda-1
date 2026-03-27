import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../layout.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main class="min-h-screen pt-40 pb-20 bg-gray-50 flex items-center justify-center">
      <div class="max-w-xl w-full mx-auto px-4 text-center">
        <div class="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          <!-- Celebration Background Decor -->
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-yellow-50 rounded-full blur-3xl opacity-50"></div>
          <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
          
          <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center text-white text-5xl mx-auto mb-8 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <i class="fas fa-check"></i>
          </div>

          <h1 class="text-4xl font-black text-gray-800 mb-4 tracking-tight">Order Placed!</h1>
          <p class="text-gray-500 font-medium mb-10 text-lg">Your delicious meal is being prepared with love.</p>

          <div class="bg-gray-50 rounded-3xl p-8 mb-10 border-2 border-dashed border-gray-200">
            <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Tracking ID</p>
            <div class="flex items-center justify-center gap-3">
              <span class="text-3xl font-black text-custom-yellow-dark tracking-widest">{{ trackingId }}</span>
              <button (click)="copyId()" class="text-gray-400 hover:text-custom-yellow transition-colors">
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <button [routerLink]="['/track-order']" [queryParams]="{ id: trackingId }" class="w-full bg-custom-yellow hover:bg-yellow-500 text-gray-800 font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg">
              Track My Order
            </button>
            <button [routerLink]="['/']" class="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl transition-all">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `
})
export class OrderSuccessComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private layout = inject(LayoutService);
  public trackingId: string = '';

  constructor() {
    this.trackingId = this.route.snapshot.queryParams['id'] || 'NP-UNKNOWN';
  }

  copyId() {
    navigator.clipboard.writeText(this.trackingId);
  }

  trackOrder() {
    this.router.navigate(['/track-order'], { queryParams: { id: this.trackingId } });
  }
}

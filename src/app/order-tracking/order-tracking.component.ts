import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../order.service';
import { LayoutService } from '../layout.service';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main class="min-h-screen pt-40 pb-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Search Section -->
        <div class="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-gray-100 mb-8 md:mb-12 transform hover:scale-[1.01] transition-all duration-500">
          <div class="text-center mb-8 md:mb-10">
            <h2 class="text-2xl md:text-3xl font-black text-gray-800 mb-2 md:mb-3 tracking-tight">Track Your Order</h2>
            <p class="text-sm md:text-base text-gray-500 font-medium">Enter your tracking ID to see real-time updates</p>
          </div>

          <div class="relative max-w-lg mx-auto">
            <input 
              type="text" 
              [(ngModel)]="searchId"
              (keyup.enter)="track()"
              placeholder="e.g., NP-XXXXXX"
              class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-5 pr-28 md:py-5 md:px-8 md:pr-32 text-base md:text-lg font-black text-gray-800 placeholder:text-gray-300 focus:border-custom-yellow focus:bg-white outline-none transition-all shadow-inner"
            >
            <button 
              (click)="track()"
              class="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 bg-custom-yellow hover:bg-yellow-500 text-gray-800 font-black px-4 md:px-6 text-sm md:text-base rounded-xl shadow-lg transition-all active:scale-95"
            >
              Track
            </button>
          </div>
        </div>

        <!-- Status Display -->
        <div *ngIf="currentOrder()" class="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-8 opacity-10">
            <i class="fas fa-shipping-fast text-7xl md:text-9xl transform -rotate-12 translate-x-4 md:translate-x-10 -translate-y-4 md:-translate-y-10"></i>
          </div>

          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12 pb-6 md:pb-8 border-b border-gray-50">
            <div>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Status</p>
              <h3 class="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-3">
                {{ formatStatus(currentOrder()!.status) }}
                <span class="inline-block w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></span>
              </h3>
            </div>
            <div class="text-left md:text-right">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
              <p class="text-2xl md:text-3xl font-black text-custom-yellow-dark">{{ currentOrder()!.eta }}</p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="flex justify-between items-center relative mb-12 md:mb-16 px-2 md:px-4">
            <div class="absolute top-1/2 left-0 right-0 h-1 md:h-1.5 bg-gray-100 -translate-y-1/2"></div>
            <div class="absolute top-1/2 left-0 h-1 md:h-1.5 bg-custom-yellow -translate-y-1/2 transition-all duration-1000"
                 [style.width]="progressWidth() + '%'"></div>

            <!-- Steps -->
            <div *ngFor="let step of steps; let i = index" class="relative z-10 flex flex-col items-center">
              <div class="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-xl transition-all duration-500"
                   [class.bg-custom-yellow]="i <= currentStep()"
                   [class.text-gray-800]="i <= currentStep()"
                   [class.bg-white]="i > currentStep()"
                   [class.text-gray-300]="i > currentStep()"
                   [class.border-[3px]]="i > currentStep()"
                   [class.md:border-4]="i > currentStep()"
                   [class.border-gray-100]="i > currentStep()"
                   [class.shadow-xl]="i <= currentStep()">
                <i [class]="step.icon"></i>
              </div>
              <p class="absolute top-12 md:top-14 whitespace-nowrap text-[9px] md:text-[11px] font-black uppercase tracking-wide md:tracking-widest"
                 [class.text-gray-800]="i <= currentStep()"
                 [class.text-gray-300]="i > currentStep()">
                {{ step.label }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-10 md:mt-12 bg-gray-50 rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 border-dashed border-gray-200">
             <div class="flex items-center gap-4">
               <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-custom-yellow text-xl">
                 <i class="fas fa-map-marker-alt"></i>
               </div>
               <div>
                 <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Location</p>
                 <p class="font-bold text-gray-800">{{ currentOrder()!.location }}</p>
               </div>
             </div>
             <div class="flex items-center gap-4">
               <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-custom-yellow text-xl">
                 <i class="fas fa-shopping-basket"></i>
               </div>
               <div>
                 <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Items Ordered</p>
                 <p class="font-bold text-gray-800">{{ currentOrder()!.items.length }} Items</p>
               </div>
             </div>
          </div>
        </div>

        <!-- Not Found -->
        <div *ngIf="hasSearched() && !currentOrder()" class="bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl border border-gray-100">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-red-50 text-red-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl mx-auto mb-4 md:mb-6">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3 class="text-xl md:text-2xl font-black text-gray-800 mb-2">Order Not Found</h3>
          <p class="text-sm md:text-base text-gray-500">Please check your tracking ID and try again.</p>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `,

  // Using FormsModule for ngModel
  host: {
    '[class.block]': 'true'
  }
})
export class OrderTrackingComponent implements OnInit {
  private orderService = inject(OrderService);
  private layout = inject(LayoutService);
  private route = inject(ActivatedRoute);
  public searchId = '';

  ngOnInit() {
    this.layout.activeTab.set('track-order');
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.searchId = id;
      setTimeout(() => this.track(), 0);
    }
  }

  public hasSearched = signal(false);
  public currentOrder = signal<Order | null>(null);

  public steps = [
    { label: 'Confirmed', status: 'processing', icon: 'fas fa-receipt' },
    { label: 'Preparing', status: 'packed', icon: 'fas fa-box' },
    { label: 'On the Way', status: 'in-transit', icon: 'fas fa-motorcycle' },
    { label: 'Delivered', status: 'delivered', icon: 'fas fa-home' }
  ];

  public track() {
    this.hasSearched.set(true);
    const order = this.orderService.getOrder(this.searchId.toUpperCase().trim());
    if (order) {
      this.currentOrder.set(this.orderService.getDemoStatus(order));
    } else {
      this.currentOrder.set(null);
    }
  }

  public currentStep = computed(() => {
    const order = this.currentOrder();
    if (!order) return -1;
    return this.steps.findIndex(s => s.status === order.status);
  });

  public progressWidth = computed(() => {
    const step = this.currentStep();
    if (step < 0) return 0;
    return (step / (this.steps.length - 1)) * 100;
  });

  public formatStatus(status: string) {
    switch(status) {
      case 'processing': return 'Order Confirmed';
      case 'packed': return 'Food is Ready';
      case 'in-transit': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  }
}

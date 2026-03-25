import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ========== FIXED HEADER ========== -->
    <div class="fixed top-0 left-0 w-full bg-white shadow-sm z-[1000] transition-all duration-300" 
      style="display: flex; justify-content: center; border-bottom: 1px solid #f3f4f6;">
      <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Header top row -->
        <header class="flex flex-wrap items-center justify-between gap-3 py-3" style="transform-style: preserve-3d;">
          <div class="flex items-center flex-wrap gap-3 sm:gap-6" style="transform-style: preserve-3d;">
            <div class="flex flex-col leading-none tracking-tighter" [routerLink]="['/']" style="cursor: pointer;">
              <span class="text-3xl font-black text-gray-800">NOSHAHI</span>
              <span class="text-3xl font-black" style="color: #FBCE07;">PANDA</span>
            </div>
            <div class="relative inline-block" style="transform-style: preserve-3d; z-index: 100;">
              <div id="locationPill" (click)="layout.toggleCityDropdown($event)"
                class="flex items-center text-gray-700 text-sm sm:text-base border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-all cursor-pointer">
                <i class="fas fa-map-marker-alt text-custom-yellow mr-2"></i>
                <span id="locationText" class="font-medium truncate max-w-[120px] sm:max-w-xs">{{ layout.currentAddress() }}</span>
                <i class="fas fa-chevron-down ml-2 text-gray-400 text-xs"></i>
              </div>
              <!-- dropdown – completely solid white -->
              <div id="citySearchDropdown" [class.show]="layout.showCityDropdown()"
                (click)="$event.stopPropagation()"
                class="border border-gray-200 rounded-xl shadow-xl"
                style="display: none; position: absolute; top: 100%; left: 0; transform: translateY(8px); min-width: 280px; z-index: 1000; background: white;"
                [style.display]="layout.showCityDropdown() ? 'block' : 'none'">
                <div class="p-3">
                  <div class="relative">
                    <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input type="text" id="citySearchInput" placeholder="Search Pakistani city..."
                      (input)="layout.filterCities($event)" (keydown.enter)="layout.selectFirstCity($event)"
                      (keydown.escape)="layout.showCityDropdown.set(false)"
                      class="w-full border border-gray-200 rounded-full py-2.5 pl-9 pr-4 text-sm bg-gray-50 focus:ring-2 focus:ring-custom-yellow focus:border-transparent">
                  </div>
                  <div id="suggestionList" class="mt-2 max-h-48 overflow-y-auto divide-y divide-gray-100">
                    @for (city of layout.filteredCities(); track city) {
                    <div
                      class="suggestion-item px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition cursor-default"
                      (click)="layout.updateLocation(city)">
                      {{ city }}
                    </div>
                    } @empty {
                    <div class="px-3 py-2 text-sm text-gray-500">No matching cities</div>
                    }
                  </div>
                  <div class="text-xs text-gray-500 mt-2 px-2">Click on a city to select</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">
            <button type="button" (click)="layout.openSignupModal()"
              class="trigger-signup-modal text-gray-600 hover:text-custom-yellow-dark font-medium cursor-pointer bg-transparent border-0 p-0">Log
              in</button>
            <button type="button" (click)="layout.openSignupModal()"
              class="trigger-signup-modal bg-custom-yellow hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition flex items-center gap-1"
              style="box-shadow: 0 8px 14px -6px rgba(251,206,7,0.4);">
              <i class="fas fa-gift"></i> <span class="hidden sm:inline">Sign up for free delivery</span><span
                class="sm:hidden">Sign up</span>
            </button>
            <button (click)="layout.showCart.set(true)" 
              class="flex items-center text-gray-700 hover:text-custom-yellow-dark transition-all relative cart-icon-btn"
              [class.pulse-active]="pulseActive()">
              <i class="fas fa-shopping-cart text-xl"></i>
              <span *ngIf="layout.totalCartQuantity() > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {{ layout.totalCartQuantity() }}
              </span>
            </button>
            <div class="flex items-center text-gray-700 border-l pl-3 border-gray-300">
              <i class="fas fa-globe text-gray-500 mr-1"></i>
              <span class="font-medium">EN</span>
              <i class="fas fa-chevron-down ml-1 text-xs text-gray-500"></i>
            </div>
          </div>
        </header>

        <!-- TABS -->
        <div class="flex flex-wrap gap-2 border-t border-gray-50 pt-1" id="tabContainer">
          @for (tab of layout.tabs; track tab.id) {
          <button class="tab-btn py-3 px-6 font-bold text-sm uppercase tracking-wide transition-all border-b-2" 
            [class.active-tab]="layout.activeTab() === tab.id"
            [class.text-custom-yellow-dark]="layout.activeTab() === tab.id" 
            [class.border-custom-yellow]="layout.activeTab() === tab.id"
            [class.text-gray-400]="layout.activeTab() !== tab.id" 
            [class.border-transparent]="layout.activeTab() !== tab.id"
            [style.border-bottom-color]="layout.activeTab() === tab.id ? '#FBCE07' : 'transparent'"
            [style.color]="layout.activeTab() === tab.id ? '#EAB308' : '#9CA3AF'"
            (click)="onTabClick(tab.id)">
            <div class="flex items-center gap-2">
              <i [class]="tab.icon"></i>
              <span>{{ tab.label }}</span>
            </div>
          </button>
          }
        </div>
      </div>
    </div>

    <!-- STICKY BOTTOM BANNER -->
    <div *ngIf="showStickyBanner()"
      class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-[99] p-4 animate-slide-up">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-custom-yellow text-2xl">
            <i class="fas fa-gift"></i>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 text-sm md:text-base">Get free delivery on your first order!</h4>
            <p class="text-gray-500 text-xs md:text-sm">Sign up now and enjoy special discounts.</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button (click)="layout.openSignupModal()"
            class="bg-custom-yellow hover:bg-yellow-500 text-gray-800 font-bold px-6 py-2.5 rounded-full shadow-md transition whitespace-nowrap text-sm">
            Sign up now
          </button>
          <button (click)="showStickyBanner.set(false)" class="text-gray-400 hover:text-gray-600 p-2">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ========== SIGNUP MODAL HTML (RESTORATION) ========== -->
    <div *ngIf="layout.showSignupModal()" id="signupModal" 
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 active"
      (click)="$event.target === $event.currentTarget && layout.showSignupModal.set(false)">
      
      <div class="modal-content bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative p-10 border-4"
           style="transform-style: preserve-3d; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); border-color: #FBCE07;">
        
        <!-- Close Button -->
        <button id="closeModal" (click)="layout.showSignupModal.set(false)"
          class="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-gray-800 hover:text-red-500 transition-all border-2 border-gray-100 z-20">
          <i class="fas fa-times text-xl"></i>
        </button>

        <div class="text-center mb-8" style="transform: translateZ(30px);">
          <div class="inline-flex flex-col leading-none tracking-tighter mb-4">
            <span class="text-2xl font-black text-gray-800">NOSHAHI</span>
            <span class="text-2xl font-black" style="color: #FBCE07;">PANDA</span>
          </div>
          <h2 class="text-3xl font-black text-gray-800 mb-2">Welcome Back!</h2>
          <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">Sign up or log in to continue</p>
        </div>

        <div class="flex flex-col gap-4" style="transform: translateZ(20px);">
          <!-- Facebook -->
          <button class="social-btn btn-facebook flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-white bg-[#1877F2] hover:bg-[#166fe5] shadow-lg transition-all hover:-translate-y-1 active:translate-y-0">
            <i class="fab fa-facebook-f text-xl"></i>
            <span>Continue with Facebook</span>
          </button>

          <!-- Google -->
          <button class="social-btn btn-google flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-gray-700 bg-white border-2 border-gray-100 hover:bg-gray-50 shadow-lg transition-all hover:-translate-y-1 active:translate-y-0">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" class="w-6 h-6">
            <span>Continue with Google</span>
          </button>

          <!-- Apple -->
          <button class="social-btn btn-apple flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-white bg-black hover:bg-gray-900 shadow-xl transition-all hover:-translate-y-1 active:translate-y-0">
            <i class="fab fa-apple text-xl"></i>
            <span>Continue with Apple</span>
          </button>

          <div class="flex items-center gap-4 my-2">
            <div class="flex-grow h-[2px] bg-gray-100"></div>
            <span class="text-gray-400 font-black text-xs uppercase tracking-widest">or</span>
            <div class="flex-grow h-[2px] bg-gray-100"></div>
          </div>

          <!-- Native Buttons -->
          <button class="w-full py-4 rounded-2xl font-black text-gray-800 bg-[#FBCE07] hover:bg-[#EAB308] shadow-[0_10px_20px_rgba(251,206,7,0.3)] transition-all hover:-translate-y-1 active:translate-y-0 border-b-4 border-[#EAB308]">
            Log in
          </button>

          <button class="w-full py-4 rounded-2xl font-black text-gray-700 bg-white border-2 border-gray-800 hover:bg-gray-50 transition-all hover:-translate-y-1 active:translate-y-0">
            Sign up
          </button>
        </div>

        <p class="text-[10px] text-center text-gray-400 mt-10 leading-relaxed font-bold uppercase tracking-wider" style="transform: translateZ(10px);">
          By signing up, you agree to our 
          <a href="#" class="text-[#EAB308] hover:underline">Terms</a> and 
          <a href="#" class="text-[#EAB308] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>

    <!-- ========== CART SIDEBAR ========== -->
    <div *ngIf="layout.showCart()" class="fixed inset-0 z-[10001] bg-black/50 backdrop-blur-sm transition-opacity"
      (click)="layout.showCart.set(false)">
      <div (click)="$event.stopPropagation()"
        class="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
        <!-- Sidebar Header -->
        <div class="p-6 border-b flex flex-col gap-4 bg-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="fas fa-shopping-basket text-2xl text-custom-yellow"></i>
              <h2 class="text-xl font-extrabold text-gray-800">Your Cart</h2>
            </div>
            <button (click)="layout.showCart.set(false)" class="text-gray-400 hover:text-red-500 transition-colors p-2">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Free Delivery Progress -->
          <div *ngIf="!layout.isCartEmpty()" class="space-y-2">
            <div class="flex justify-between items-center text-xs font-bold">
              <span class="text-gray-600">
                {{ layout.amountToFreeDelivery() > 0 ? 'Rs. ' + layout.amountToFreeDelivery() + ' to Free Delivery' : 'You got FREE Delivery!' }}
              </span>
              <span class="text-custom-yellow-dark">{{ layout.freeDeliveryProgress() | number:'1.0-0' }}%</span>
            </div>
            <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-custom-yellow transition-all duration-500" 
                [style.width.%]="layout.freeDeliveryProgress()"></div>
            </div>
          </div>

          <!-- Delivery Time Estimate -->
          <div class="flex items-center gap-2 bg-yellow-50 text-custom-yellow-dark px-3 py-1.5 rounded-lg text-xs font-bold w-fit">
            <i class="fas fa-clock"></i>
            <span>Estimated Delivery: 25-35 mins</span>
          </div>
        </div>

        <!-- Cart Items -->
        <div class="flex-grow overflow-y-auto p-6 space-y-6">
          <div *ngIf="layout.isCartEmpty()" class="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
            <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 transition-transform hover:scale-110">
              <i class="fas fa-shopping-cart text-4xl"></i>
            </div>
            <div>
              <p class="text-gray-800 font-black text-lg">Your cart is empty</p>
              <p class="text-gray-500 text-sm">Looks like you haven't added anything yet.</p>
            </div>
            <button (click)="layout.showCart.set(false)" 
              class="bg-custom-yellow hover:bg-yellow-500 text-gray-800 font-bold px-8 py-3 rounded-full shadow-md transition-all">
              Browse Menu
            </button>
          </div>

          <div *ngFor="let item of layout.cartItems()" class="flex gap-4 group animate-fade-in">
            <div class="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
              <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-bold text-gray-800 text-sm line-clamp-2">{{ item.name }}</h3>
                <button (click)="layout.removeFromCart(item.id)" class="text-gray-300 hover:text-red-500 ml-2">
                  <i class="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
              <p class="text-xs text-gray-500 mb-3">{{ item.weight }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-1 px-2 border border-gray-100">
                  <button (click)="layout.updateQuantity(item.id, -1)" class="text-gray-500 hover:text-custom-yellow-dark p-1">
                    <i class="fas fa-minus text-[10px]"></i>
                  </button>
                  <span class="text-xs font-bold w-4 text-center">{{ item.quantity }}</span>
                  <button (click)="layout.updateQuantity(item.id, 1)" class="text-gray-500 hover:text-custom-yellow-dark p-1">
                    <i class="fas fa-plus text-[10px]"></i>
                  </button>
                </div>
                <div class="text-sm font-black text-gray-800">Rs. {{ item.price * item.quantity }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Footer -->
        <div *ngIf="!layout.isCartEmpty()" class="p-6 bg-white border-t space-y-4">
          <!-- Voucher Code -->
          <div class="relative">
            <input type="text" [value]="layout.voucherCode()" (input)="layout.voucherCode.set($any($event.target).value)"
              placeholder="Enter voucher code"
              class="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl py-3 px-4 text-sm focus:border-custom-yellow focus:ring-0 outline-none transition-all">
            <button class="absolute right-2 top-1/2 -translate-y-1/2 text-custom-yellow-dark font-black text-xs uppercase px-3 py-1.5 bg-yellow-100 rounded-lg">Apply</button>
          </div>

          <div class="space-y-2 pt-2">
            <div class="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>Rs. {{ layout.totalCartPrice() }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>Delivery Fee</span>
              <span [class.text-green-600]="layout.deliveryFee() === 0" [class.font-bold]="layout.deliveryFee() === 0">
                {{ layout.deliveryFee() === 0 ? 'FREE' : 'Rs. ' + layout.deliveryFee() }}
              </span>
            </div>
            <div class="flex justify-between text-lg font-black text-gray-800 pt-2 border-t border-gray-200">
              <span>Total Amount</span>
              <span>Rs. {{ layout.totalCartPrice() + layout.deliveryFee() }}</span>
            </div>
          </div>
          <button routerLink="/checkout" (click)="layout.showCart.set(false)"
            class="w-full bg-[#FBCE07] hover:bg-[#EAB308] text-gray-800 font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(251,206,7,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border-b-4 border-[#EAB308]">
            Review Payment & Address
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.5s ease-out;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .pulse-active {
      animation: cartPulseEffect 0.4s ease-out;
    }
    @keyframes cartPulseEffect {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
    .animate-slide-left {
      animation: slideLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes slideLeft {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .active-tab {
      background: #fff;
    }
  `]
})
export class HeaderComponent {
  public readonly showStickyBanner = signal(true);
  public readonly pulseActive = signal(false);
  private router = inject(Router);

  constructor(public layout: LayoutService) {
    effect(() => {
      // Trigger whenever cartPulse changes
      const pulse = this.layout.cartPulse();
      if (pulse > 0) {
        this.pulseActive.set(true);
        setTimeout(() => this.pulseActive.set(false), 400);
      }
    }, { allowSignalWrites: true });
  }

  onTabClick(tabId: string) {
    this.layout.activeTab.set(tabId);
    if (tabId === 'shops') {
      this.router.navigate(['/shops']);
    } else if (tabId === 'caterers') {
      this.router.navigate(['/caterers']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

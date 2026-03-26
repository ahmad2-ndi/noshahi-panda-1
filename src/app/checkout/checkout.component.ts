import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { LayoutService } from '../layout.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <main class="min-h-screen pt-32 pb-20 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <!-- Back Button -->
        <button [routerLink]="['/']" class="flex items-center gap-2 text-gray-500 hover:text-custom-yellow-dark mb-6 transition-colors font-medium">
          <i class="fas fa-arrow-left"></i>
          Back to Menu
        </button>

        <h1 class="text-4xl font-black text-gray-800 mb-8 tracking-tight">Checkout</h1>

        <div class="grid grid-cols-1 gap-8">
          <!-- 1. Delivery Address -->
          <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-2 h-full bg-custom-yellow"></div>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-custom-yellow text-xl">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Delivery Address</h2>
              </div>
              <button *ngIf="hasAddress() && !isEditingAddress()" (click)="isEditingAddress.set(true)" 
                class="text-custom-yellow-dark font-bold text-sm hover:underline">Edit</button>
            </div>
            
            <!-- Address Display -->
            <div *ngIf="hasAddress() && !isEditingAddress()" class="bg-white rounded-3xl p-8 border-2 border-gray-50 flex items-start gap-6 shadow-xl relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4">
                <i class="fas fa-shipping-fast text-yellow-100 text-5xl transform rotate-12"></i>
              </div>
              <div class="flex-grow space-y-4">
                <div class="flex items-center gap-3">
                    <span class="px-3 py-1 bg-gradient-to-r from-custom-yellow to-yellow-500 text-gray-800 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">Primary Address</span>
                    <p class="font-black text-2xl text-gray-800">{{ layout.userAddress().name }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <p class="text-gray-600 font-medium">{{ layout.userAddress().street }}</p>
                    <p class="text-gray-500 text-sm">{{ layout.userAddress().city }}, {{ layout.userAddress().province }}</p>
                </div>
                <div class="flex flex-wrap gap-4 pt-2">
                    <div class="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                        <i class="fas fa-phone-alt text-custom-yellow"></i>
                        <span>{{ layout.userAddress().phone }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                        <i class="fas fa-envelope text-custom-yellow"></i>
                        <span>{{ layout.userAddress().email }}</span>
                    </div>
                </div>
              </div>
              <i class="fas fa-check-circle text-green-500 text-2xl mt-1"></i>
            </div>

            <!-- Full Address Form -->
            <div *ngIf="!hasAddress() || isEditingAddress()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-500 uppercase ml-2 tracking-wider">Full Name</label>
                    <input type="text" [value]="layout.userAddress().name" (input)="updateAddress('name', $any($event.target).value)"
                        placeholder="Enter your name" class="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm focus:border-custom-yellow shadow-sm outline-none transition-all">
                </div>
                <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-500 uppercase ml-2 tracking-wider">Phone Number</label>
                    <input type="text" [value]="layout.userAddress().phone" (input)="updateAddress('phone', $any($event.target).value)"
                        placeholder="03xx-xxxxxxx" class="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm focus:border-custom-yellow shadow-sm outline-none transition-all">
                </div>
              </div>

              <div class="space-y-2">
                  <label class="text-[11px] font-black text-gray-500 uppercase ml-2 tracking-wider">Email Address</label>
                  <input type="email" [value]="layout.userAddress().email" (input)="updateAddress('email', $any($event.target).value)"
                      placeholder="yourname@example.com" class="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm focus:border-custom-yellow shadow-sm outline-none transition-all">
              </div>

              <div class="space-y-2">
                  <label class="text-[11px] font-black text-gray-500 uppercase ml-2 tracking-wider">Detailed Address</label>
                  <textarea [value]="layout.userAddress().street" (input)="updateAddress('street', $any($event.target).value)"
                    placeholder="House #, Street, Block, Landmark..."
                    class="w-full bg-white border-2 border-gray-100 rounded-3xl py-4 px-6 text-sm focus:border-custom-yellow shadow-sm outline-none h-28 resize-none transition-all"></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-500 uppercase ml-2 tracking-wider">City</label>
                    <select [value]="layout.userAddress().city" (change)="updateAddress('city', $any($event.target).value)"
                        class="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm focus:border-custom-yellow shadow-sm outline-none appearance-none cursor-pointer">
                        <option *ngFor="let city of layout.pakistaniCities" [value]="city">{{ city }}</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-500 uppercase ml-2 tracking-wider">Province</label>
                    <select [value]="layout.userAddress().province" (change)="updateAddress('province', $any($event.target).value)"
                        class="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm focus:border-custom-yellow shadow-sm outline-none appearance-none cursor-pointer">
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Islamabad">Islamabad Capital Territory</option>
                    </select>
                </div>
              </div>

              <button (click)="isEditingAddress.set(false)" 
                [disabled]="!isFormValid()"
                class="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed shadow-xl">
                Review and Proceed
              </button>
            </div>

          </section>

          <!-- 2. Payment Method -->
          <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-custom-yellow text-xl">
                <i class="fas fa-credit-card"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Payment Method</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Cash on Delivery -->
              <div (click)="layout.selectedPaymentMethod.set('cod')" 
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:border-gray-200 h-full"
                [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'cod'"
                [class.bg-yellow-50/30]="layout.selectedPaymentMethod() === 'cod'"
                [class.border-gray-100]="layout.selectedPaymentMethod() !== 'cod'">
                  <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl">
                    <i class="fas fa-money-bill-wave"></i>
                  </div>
                  <div class="flex-grow">
                    <p class="font-bold text-gray-800 text-sm">Cash on Delivery</p>
                    <p class="text-[10px] text-gray-500 uppercase font-black">Safe & Reliable</p>
                  </div>
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'cod'"
                    [class.bg-custom-yellow]="layout.selectedPaymentMethod() === 'cod'"
                    [class.border-gray-200]="layout.selectedPaymentMethod() !== 'cod'">
                    <div class="w-2 h-2 bg-white rounded-full transition-opacity"
                         [class.opacity-100]="layout.selectedPaymentMethod() === 'cod'"
                         [class.opacity-0]="layout.selectedPaymentMethod() !== 'cod'"></div>
                  </div>
              </div>

              <!-- Bank Card -->
              <div (click)="layout.selectedPaymentMethod.set('card')" 
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:border-gray-200 h-full"
                [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'card'"
                [class.bg-yellow-50/30]="layout.selectedPaymentMethod() === 'card'"
                [class.border-gray-100]="layout.selectedPaymentMethod() !== 'card'">
                  <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 text-xl">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <div class="flex-grow">
                    <p class="font-bold text-gray-800 text-sm">Bank Card</p>
                    <p class="text-[10px] text-gray-500 uppercase font-black">Master / Visa</p>
                  </div>
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'card'"
                    [class.bg-custom-yellow]="layout.selectedPaymentMethod() === 'card'"
                    [class.border-gray-200]="layout.selectedPaymentMethod() !== 'card'">
                    <div class="w-2 h-2 bg-white rounded-full transition-opacity"
                         [class.opacity-100]="layout.selectedPaymentMethod() === 'card'"
                         [class.opacity-0]="layout.selectedPaymentMethod() !== 'card'"></div>
                  </div>
              </div>

              <!-- EasyPaisa -->
              <div (click)="layout.selectedPaymentMethod.set('easypaisa')" 
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:border-gray-200 h-full"
                [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'easypaisa'"
                [class.bg-yellow-50/30]="layout.selectedPaymentMethod() === 'easypaisa'"
                [class.border-gray-100]="layout.selectedPaymentMethod() !== 'easypaisa'">
                  <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 p-1">
                    <img src="https://logowik.com/content/uploads/images/easypaisa9485.logowik.com.webp" class="w-full h-full object-contain" alt="EasyPaisa">
                  </div>
                  <div class="flex-grow">
                    <p class="font-bold text-gray-800 text-sm">EasyPaisa</p>
                    <p class="text-[10px] text-gray-500 uppercase font-black">Fast Payment</p>
                  </div>
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'easypaisa'"
                    [class.bg-custom-yellow]="layout.selectedPaymentMethod() === 'easypaisa'"
                    [class.border-gray-200]="layout.selectedPaymentMethod() !== 'easypaisa'">
                    <div class="w-2 h-2 bg-white rounded-full transition-opacity"
                         [class.opacity-100]="layout.selectedPaymentMethod() === 'easypaisa'"
                         [class.opacity-0]="layout.selectedPaymentMethod() !== 'easypaisa'"></div>
                  </div>
              </div>

              <!-- JazzCash -->
              <div (click)="layout.selectedPaymentMethod.set('jazzcash')" 
                class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer hover:border-gray-200 h-full"
                [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'jazzcash'"
                [class.bg-yellow-50/30]="layout.selectedPaymentMethod() === 'jazzcash'"
                [class.border-gray-100]="layout.selectedPaymentMethod() !== 'jazzcash'">
                  <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 p-1">
                    <img src="https://store-images.s-microsoft.com/image/apps.31144.13548682613143614.94582f34-297d-419b-bafe-5b0c95d985e5.459d1844-3cb1-447a-8f43-3000632ecf55?h=464" class="w-full h-full object-contain" alt="JazzCash">
                  </div>
                  <div class="flex-grow">
                    <p class="font-bold text-gray-800 text-sm">JazzCash</p>
                    <p class="text-[10px] text-gray-500 uppercase font-black">Instant Pay</p>
                  </div>
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    [class.border-custom-yellow]="layout.selectedPaymentMethod() === 'jazzcash'"
                    [class.bg-custom-yellow]="layout.selectedPaymentMethod() === 'jazzcash'"
                    [class.border-gray-200]="layout.selectedPaymentMethod() !== 'jazzcash'">
                    <div class="w-2 h-2 bg-white rounded-full transition-opacity"
                         [class.opacity-100]="layout.selectedPaymentMethod() === 'jazzcash'"
                         [class.opacity-0]="layout.selectedPaymentMethod() !== 'jazzcash'"></div>
                  </div>
              </div>
            </div>
          </section>




          <!-- 3. Order Summary -->
          <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div class="space-y-4 mb-8">
              <div *ngFor="let item of layout.cartItems()" class="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div class="flex items-center gap-3">
                  <span class="bg-yellow-100 text-custom-yellow-dark text-xs font-black px-2 py-1 rounded-md">{{ item.quantity }}x</span>
                  <p class="text-sm font-bold text-gray-700">{{ item.name }}</p>
                </div>
                <p class="text-sm font-black text-gray-800">Rs. {{ item.price * item.quantity }}</p>
              </div>
            </div>

            <div class="space-y-3 bg-gray-50 rounded-2xl p-6">
              <div class="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {{ layout.totalCartPrice() }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span class="text-green-600 font-bold">{{ layout.deliveryFee() === 0 ? 'FREE' : 'Rs. ' + layout.deliveryFee() }}</span>
              </div>
              <div class="flex justify-between text-xl font-black text-gray-800 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span>Rs. {{ layout.totalCartPrice() + layout.deliveryFee() }}</span>
              </div>
            </div>

            <button (click)="placeOrder()" class="w-full mt-8 bg-custom-yellow hover:bg-yellow-500 text-gray-800 font-black py-5 rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] border-b-4 border-yellow-600 text-lg">
              Place Order Now
            </button>
          </section>
        </div>
      </div>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    :host { display: block; }
  `]

})
export class CheckoutComponent {
  public layout = inject(LayoutService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  public isEditingAddress = signal(false);

  // Consider address empty if it's default or whitespace
  public hasAddress = computed(() => {
    const addr = this.layout.userAddress();
    return !!(addr.name && addr.street && addr.phone && addr.email && addr.street.length > 5 && addr.phone.length >= 11);
  });

  updateAddress(field: string, value: string) {
    this.layout.userAddress.update(prev => ({ ...prev, [field]: value }));
  }

  isFormValid() {
    const addr = this.layout.userAddress();
    return !!(addr.name && addr.street && addr.phone && addr.email && addr.street.length > 5 && addr.phone.length >= 11 && addr.email.includes('@'));
  }



  placeOrder() {
    if (!this.hasAddress()) {
      alert('Please add a delivery address first!');
      this.isEditingAddress.set(true);
      return;
    }

    const trackingId = this.orderService.placeOrder(
      this.layout.cartItems(),
      this.layout.userAddress(),
      this.layout.selectedPaymentMethod(),
      this.layout.totalCartPrice() + this.layout.deliveryFee()
    );

    this.layout.cartItems.set([]);
    this.router.navigate(['/order-success'], { queryParams: { id: trackingId } });
  }
}

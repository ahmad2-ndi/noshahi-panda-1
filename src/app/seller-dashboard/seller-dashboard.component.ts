import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 px-3 sm:px-6 lg:px-8 relative">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-[2rem] sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-6 sm:mb-8">
          <div class="bg-[#FBCE07] p-5 sm:p-8 text-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-center sm:text-left">
              <h1 class="text-2xl sm:text-3xl font-black mb-1">Seller Dashboard</h1>
              <p class="font-medium opacity-90 text-sm sm:text-base">Welcome, {{ authService.currentUser()?.firstName || 'Vendor' }}! Your shop is performing well.</p>
            </div>
            <div class="flex items-center gap-2 bg-white/20 p-2 rounded-2xl backdrop-blur-sm border border-white/30">
              <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                <i class="fas fa-store text-sm"></i>
              </div>
              <div class="pr-3">
                <p class="text-[10px] font-black uppercase tracking-widest text-gray-700 leading-none mb-1">Store Status</p>
                <p class="text-xs font-bold text-gray-900">Open & Online</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 sm:p-8">
            <!-- Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div class="bg-yellow-50 p-5 rounded-2xl border border-yellow-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#FBCE07] rounded-xl flex items-center justify-center text-lg shadow-sm">
                  <i class="fas fa-shopping-bag"></i>
                </div>
                <div>
                  <p class="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</p>
                  <p class="text-xl sm:text-2xl font-black text-gray-800">24</p>
                </div>
              </div>
              
              <div class="bg-green-50 p-5 rounded-2xl border border-green-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-lg shadow-sm">
                  <i class="fas fa-wallet"></i>
                </div>
                <div>
                  <p class="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Earnings</p>
                  <p class="text-xl sm:text-2xl font-black text-gray-800">Rs. 12,450</p>
                </div>
              </div>
              
              <div class="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-lg shadow-sm">
                  <i class="fas fa-utensils"></i>
                </div>
                <div>
                  <p class="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Active Menu</p>
                  <p class="text-xl sm:text-2xl font-black text-gray-800">{{ activeMenuCount() }}</p>
                </div>
              </div>
            </div>

            <!-- Recent Orders Section -->
            <div class="flex justify-between items-center mb-4 sm:mb-6">
              <h2 class="text-lg sm:text-xl font-black text-gray-800">Recent Orders</h2>
              <button class="text-[#EAB308] font-bold text-xs sm:text-sm hover:underline">View All</button>
            </div>

            <!-- Desktop Table View -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th class="pb-4">Order ID</th>
                    <th class="pb-4">Customer</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4">Amount</th>
                    <th class="pb-4 text-right px-4">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr *ngFor="let order of recentOrders()" class="group transition-colors hover:bg-gray-50/50">
                    <td class="py-4 font-bold text-gray-800">#ORD-00{{order.id}}</td>
                    <td class="py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">{{ order.initials }}</div>
                        <span class="text-sm font-medium text-gray-600">{{ order.customer }}</span>
                      </div>
                    </td>
                    <td class="py-4">
                      <span class="px-3 py-1 bg-yellow-100 text-[#EAB308] text-[10px] font-black rounded-full uppercase">{{ order.status }}</span>
                    </td>
                    <td class="py-4 font-black text-gray-800">Rs. {{ order.amount }}</td>
                    <td class="py-4 text-right px-4">
                      <button class="text-gray-400 hover:text-[#FBCE07] transition-colors"><i class="fas fa-ellipsis-h"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Card View -->
            <div class="sm:hidden space-y-3">
              <div *ngFor="let order of recentOrders()" class="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Order ID</p>
                    <p class="font-bold text-gray-800 text-sm">#ORD-00{{order.id}}</p>
                  </div>
                  <span class="px-3 py-1 bg-yellow-100 text-[#EAB308] text-[8px] font-black rounded-full uppercase">{{ order.status }}</span>
                </div>
                <div class="flex items-center gap-3 py-2 border-y border-gray-50">
                   <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">{{ order.initials }}</div>
                   <div>
                     <p class="text-xs font-bold text-gray-800">{{ order.customer }}</p>
                     <p class="text-[10px] text-gray-400 font-bold uppercase">Customer</p>
                   </div>
                   <div class="ml-auto text-right">
                     <p class="font-black text-gray-800 text-sm leading-none mb-1">Rs. {{ order.amount }}</p>
                     <p class="text-[10px] text-gray-400 font-bold uppercase">Total</p>
                   </div>
                </div>
                <button class="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-xl text-xs transition-colors">
                  <i class="fas fa-info-circle mr-1"></i> View Order Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 class="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
              <button (click)="openModal('product')" class="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all group cursor-pointer">
                <i class="fas fa-plus text-xl sm:text-2xl text-gray-300 group-hover:text-[#FBCE07] mb-2 sm:mb-3"></i>
                <span class="text-xs sm:text-sm font-bold text-gray-600 group-hover:text-gray-800 text-center">Add Product</span>
              </button>
              <button (click)="openModal('settings')" class="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all group cursor-pointer">
                <i class="fas fa-cog text-xl sm:text-2xl text-gray-300 group-hover:text-[#FBCE07] mb-2 sm:mb-3"></i>
                <span class="text-xs sm:text-sm font-bold text-gray-600 group-hover:text-gray-800 text-center">Shop Settings</span>
              </button>
            </div>
          </div>

          <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 class="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6">Store Performance</h3>
            <div class="h-32 sm:h-40 flex items-end justify-between gap-1 sm:gap-2 px-1 sm:px-2">
              <div *ngFor="let h of [40, 70, 45, 90, 65, 80, 55]" [style.height.%]="h" class="flex-grow bg-[#FBCE07]/30 hover:bg-[#FBCE07] transition-all rounded-t-lg relative group">
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rs. {{h*100}}</div>
              </div>
            </div>
            <div class="flex justify-between mt-3 sm:mt-4 px-1 sm:px-2">
              <span *ngFor="let day of ['M', 'T', 'W', 'T', 'F', 'S', 'S']" class="text-[10px] font-black text-gray-400">{{day}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD PRODUCT MODAL -->
      @if (activeModal() === 'product') {
        <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div class="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
            <div class="bg-[#FBCE07] p-6 sm:p-8 flex justify-between items-center">
               <div class="flex items-center gap-3">
                 <div class="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-gray-800">
                   <i class="fas fa-plus-circle"></i>
                 </div>
                 <h3 class="text-xl font-black text-gray-800">Add New Product</h3>
               </div>
               <button (click)="closeModal()" class="w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full transition-colors flex items-center justify-center text-gray-800">
                 <i class="fas fa-times"></i>
               </button>
            </div>
            <div class="p-6 sm:p-8">
               <form (submit)="handleAddProduct($event)" class="space-y-4">
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-2">Product Title</label>
                     <input type="text" name="title" [(ngModel)]="newProduct.title" placeholder="e.g. Special Beef Biryani" class="w-full bg-gray-50 border-0 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-[#FBCE07] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300">
                   </div>
                   <div>
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-2">Price (Rs.)</label>
                     <input type="number" name="price" [(ngModel)]="newProduct.price" placeholder="550" class="w-full bg-gray-50 border-0 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-[#FBCE07] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300">
                   </div>
                 </div>
                 <div>
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-2">Description</label>
                    <textarea name="description" [(ngModel)]="newProduct.description" placeholder="Describe your delicious item..." class="w-full bg-gray-50 border-0 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-[#FBCE07] font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 h-24 resize-none"></textarea>
                 </div>
                 <div>
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-2">Product Images</label>
                    <div class="grid grid-cols-3 gap-3">
                      <div class="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FBCE07] transition-all">
                        <i class="fas fa-camera text-gray-300 group-hover:text-[#FBCE07] text-xl mb-1"></i>
                        <span class="text-[8px] font-black text-gray-400 uppercase">Main Image</span>
                      </div>
                      <div class="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FBCE07] transition-all">
                        <i class="fas fa-plus text-gray-200 text-sm"></i>
                      </div>
                      <div class="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FBCE07] transition-all">
                        <i class="fas fa-plus text-gray-200 text-sm"></i>
                      </div>
                    </div>
                 </div>
                 <button type="submit" class="w-full py-4 bg-[#FBCE07] hover:bg-[#EAB308] text-gray-800 font-black rounded-2xl shadow-xl transition-all hover:-translate-y-1 border-b-4 border-[#EAB308] mt-4">Save Product</button>
               </form>
            </div>
          </div>
        </div>
      }

      <!-- SHOP SETTINGS MODAL -->
      @if (activeModal() === 'settings') {
        <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
             <div class="bg-gray-800 p-6 sm:p-8 text-white flex justify-between items-center">
               <div class="flex items-center gap-3">
                 <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                   <i class="fas fa-cog"></i>
                 </div>
                 <h3 class="text-xl font-black">Shop Settings</h3>
               </div>
               <button (click)="closeModal()" class="w-10 h-10 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
                 <i class="fas fa-times"></i>
               </button>
            </div>
            <div class="p-6 sm:p-8 space-y-6">
              <div class="flex items-center gap-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                 <div class="w-12 h-12 bg-[#FBCE07] rounded-xl flex items-center justify-center text-gray-800">
                   <i class="fas fa-door-open"></i>
                 </div>
                 <div class="flex-grow">
                   <p class="text-xs font-black text-gray-800 mb-0.5">Shop Visibility</p>
                   <p class="text-[10px] text-gray-500 font-bold">Currently visible to all customers</p>
                 </div>
                 <div class="w-12 h-6 bg-[#FBCE07] rounded-full relative cursor-pointer ring-4 ring-yellow-100">
                   <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                 </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-2">Shop Name</label>
                  <input type="text" value="Noshahi Family Kitchen" class="w-full bg-gray-50 border-0 rounded-2xl px-5 py-3 font-bold text-gray-700 outline-none">
                </div>
                <div>
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-2">Contact Number</label>
                  <input type="text" value="+92 339 0090543" class="w-full bg-gray-50 border-0 rounded-2xl px-5 py-3 font-bold text-gray-700 outline-none">
                </div>
              </div>

              <button (click)="closeModal()" class="w-full py-4 bg-gray-800 hover:bg-gray-900 text-white font-black rounded-2xl transition-all">Update Settings</button>
            </div>
          </div>
        </div>
      }
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class SellerDashboardComponent {
  public authService = inject(AuthService);
  
  public activeModal = signal<string | null>(null);
  public activeMenuCount = signal(18);
  
  public newProduct = {
    title: '',
    price: null as number | null,
    description: ''
  };

  public recentOrders = signal([
    { id: '1', customer: 'John Doe', initials: 'JD', status: 'Pending', amount: 1200 },
    { id: '2', customer: 'Sara Khan', initials: 'SK', status: 'Pending', amount: 1450 },
    { id: '3', customer: 'Ali Abbas', initials: 'AA', status: 'Pending', amount: 980 }
  ]);

  openModal(type: string) {
    console.log('Opening modal:', type);
    this.activeModal.set(type);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    console.log('Closing modal');
    this.activeModal.set(null);
    document.body.style.overflow = 'auto';
  }

  handleAddProduct(event: Event) {
    event.preventDefault();
    console.log('Adding product:', this.newProduct);
    if (this.newProduct.title && this.newProduct.price) {
      // Logic for adding product
      this.activeMenuCount.update((c: number) => c + 1);
      
      // Notify parent or simulate success
      alert('Product "' + this.newProduct.title + '" has been added successfully!');
      
      // Reset form and close
      this.newProduct = { title: '', price: null, description: '' };
      this.closeModal();
    }
  }
}

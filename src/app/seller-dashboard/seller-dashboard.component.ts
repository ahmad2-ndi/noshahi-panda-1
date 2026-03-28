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
              <p class="font-medium opacity-90 text-sm sm:text-base text-center sm:text-left">Welcome to <b>{{ shopData().name }}</b>!</p>
            </div>
            <div class="flex items-center gap-2 bg-white/20 p-2 rounded-2xl backdrop-blur-sm border border-white/30">
              <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white" [class.bg-red-500]="!shopData().isOpen">
                <i class="fas" [class.fa-store]="shopData().isOpen" [class.fa-store-slash]="!shopData().isOpen"></i>
              </div>
              <div class="pr-3">
                <p class="text-[10px] font-black uppercase tracking-widest text-gray-700 leading-none mb-1">Store Status</p>
                <p class="text-xs font-bold text-gray-900">{{ shopData().isOpen ? 'Open & Online' : 'Closed' }}</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 sm:p-8">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 text-center">
              <div class="bg-yellow-50 p-5 rounded-2xl border border-yellow-100">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
                <p class="text-2xl font-black text-gray-800">24</p>
              </div>
              <div class="bg-green-50 p-5 rounded-2xl border border-green-100">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Earnings</p>
                <p class="text-2xl font-black text-gray-800">Rs. 12,450</p>
              </div>
              <div class="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Menu</p>
                <p class="text-2xl font-black text-gray-800">{{ activeMenuCount() }}</p>
              </div>
            </div>

            <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 class="text-lg sm:text-xl font-black text-gray-800">Recent Orders</h2>
              <button class="text-[#EAB308] font-black text-xs uppercase tracking-widest">View All</button>
            </div>

            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th class="pb-4">Order ID</th>
                    <th class="pb-4">Customer</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr *ngFor="let order of recentOrders()" class="group hover:bg-gray-50/50">
                    <td class="py-4 font-bold text-gray-800 text-sm">#ORD-00{{order.id}}</td>
                    <td class="py-4 font-medium text-gray-600 text-sm">{{ order.customer }}</td>
                    <td class="py-4"><span class="px-3 py-1 bg-yellow-100 text-[#EAB308] text-[9px] font-black rounded-full uppercase">{{ order.status }}</span></td>
                    <td class="py-4 font-black text-gray-800 text-sm text-right">Rs. {{ order.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="sm:hidden space-y-4">
              <div *ngFor="let order of recentOrders()" class="p-5 border border-gray-100 rounded-[1.5rem] bg-white shadow-sm space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-gray-400 uppercase">#ORD-00{{order.id}}</span>
                  <span class="px-2 py-1 bg-yellow-100 text-[#EAB308] text-[8px] font-black rounded-full uppercase">{{ order.status }}</span>
                </div>
                <div class="flex justify-between items-center border-t border-gray-50 pt-3">
                  <span class="font-bold text-gray-800 text-sm">{{ order.customer }}</span>
                  <span class="font-black text-gray-800 text-sm">Rs. {{ order.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 sm:p-8 rounded-[2rem] shadow-lg border border-gray-100">
            <h3 class="text-lg font-black text-gray-800 mb-6 uppercase tracking-tight">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-4">
              <button (click)="openModal('product')" class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-[1.5rem] border-2 border-dashed border-gray-200 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all group">
                <i class="fas fa-plus text-2xl text-gray-300 group-hover:text-[#FBCE07] mb-2"></i>
                <span class="text-xs font-black text-gray-500 uppercase tracking-widest">Add Product</span>
              </button>
              <button (click)="openModal('settings')" class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-[1.5rem] border-2 border-dashed border-gray-200 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all group">
                <i class="fas fa-cog text-2xl text-gray-300 group-hover:text-[#FBCE07] mb-2"></i>
                <span class="text-xs font-black text-gray-500 uppercase tracking-widest">Shop Settings</span>
              </button>
            </div>
          </div>

          <div class="bg-white p-6 sm:p-8 rounded-[2rem] shadow-lg border border-gray-100 text-center">
            <h3 class="text-lg font-black text-gray-800 mb-4 uppercase tracking-tight">Performance</h3>
            <div class="flex items-center justify-center gap-4">
              <div class="flex-1 p-4 bg-gray-50 rounded-2xl">
                 <p class="text-2xl font-black text-gray-800">4.8</p>
                 <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
              </div>
              <div class="flex-1 p-4 bg-gray-50 rounded-2xl">
                 <p class="text-2xl font-black text-gray-800">12%</p>
                 <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD PRODUCT MODAL -->
      @if (activeModal() === 'product') {
        <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div class="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up">
            <div class="bg-[#FBCE07] p-6 sm:p-8 flex justify-between items-center">
               <h3 class="text-xl font-black text-gray-800 uppercase tracking-tight">New Product</h3>
               <button (click)="closeModal()" class="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center"><i class="fas fa-times"></i></button>
            </div>
            <div class="p-6 sm:p-8">
               <form (submit)="handleAddProduct($event)" class="space-y-4">
                 <div class="grid grid-cols-2 gap-4">
                   <div class="col-span-2 sm:col-span-1">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-2">Title</label>
                     <input type="text" name="title" [(ngModel)]="newProduct.title" class="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FBCE07] outline-none">
                   </div>
                   <div class="col-span-2 sm:col-span-1">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-2">Price</label>
                     <input type="number" name="price" [(ngModel)]="newProduct.price" class="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FBCE07] outline-none">
                   </div>
                 </div>
                 <div>
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-2">Description</label>
                    <textarea name="desc" [(ngModel)]="newProduct.description" class="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FBCE07] outline-none h-24 resize-none"></textarea>
                 </div>
                 <div>
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 pl-2">Product Image</label>
                    <input type="file" id="productPicker" class="hidden" (change)="onFileSelected($event)" accept="image/*">
                    <div (click)="triggerFileInput('productPicker')" class="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative">
                      @if (newProduct.image) {
                        <img [src]="newProduct.image" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <i class="fas fa-camera text-white text-2xl"></i>
                        </div>
                      } @else {
                        <i class="fas fa-camera text-gray-400 text-3xl mb-1"></i>
                        <span class="text-[9px] font-black text-gray-400 uppercase">Select Image</span>
                      }
                    </div>
                 </div>
                 <button type="submit" class="w-full py-4 bg-[#FBCE07] text-gray-800 font-black rounded-xl shadow-xl transition-all border-b-4 border-[#EAB308] active:translate-y-1 active:border-b-0 mt-4">Add Item to Menu</button>
               </form>
            </div>
          </div>
        </div>
      }

      <!-- SHOP SETTINGS MODAL -->
      @if (activeModal() === 'settings') {
        <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div class="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up">
             <div class="bg-gray-800 p-6 sm:p-8 text-white flex justify-between items-center">
               <h3 class="text-xl font-black uppercase tracking-tight">Shop Settings</h3>
               <button (click)="closeModal()" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><i class="fas fa-times"></i></button>
            </div>
            <div class="p-6 sm:p-8 space-y-6">
              <div (click)="toggleShopStatus()" class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group">
                 <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" [class.bg-green-100]="tempShopData.isOpen" [class.bg-red-100]="!tempShopData.isOpen">
                   <i class="fas" [class.fa-door-open]="tempShopData.isOpen" [class.fa-door-closed]="!tempShopData.isOpen" [class.text-green-600]="tempShopData.isOpen" [class.text-red-600]="!tempShopData.isOpen"></i>
                 </div>
                 <div class="flex-grow">
                   <p class="text-xs font-black text-gray-800">Shop Status</p>
                   <p class="text-[10px] text-gray-400 font-bold uppercase">{{ tempShopData.isOpen ? 'Your shop is open' : 'Your shop is closed' }}</p>
                 </div>
                 <div class="w-12 h-6 rounded-full relative transition-all duration-300" [class.bg-green-500]="tempShopData.isOpen" [class.bg-gray-300]="!tempShopData.isOpen">
                    <div class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300" [style.left.px]="tempShopData.isOpen ? 28 : 4"></div>
                 </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 pl-2">Shop Display Name</label>
                  <input type="text" name="sName" [(ngModel)]="tempShopData.name" class="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-gray-200 outline-none">
                </div>
                <div>
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 pl-2">Business Contact</label>
                  <input type="text" name="sContact" [(ngModel)]="tempShopData.contact" class="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-gray-200 outline-none">
                </div>
              </div>

              <button (click)="handleUpdateSettings()" class="w-full py-4 bg-gray-800 hover:bg-gray-900 text-white font-black rounded-xl transition-all shadow-xl active:scale-95">Save Changes</button>
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
  
  public shopData = signal({
    name: 'Noshahi Family Kitchen',
    contact: '+92 339 0090543',
    isOpen: true
  });

  public tempShopData = {
    name: '',
    contact: '',
    isOpen: true
  };

  public newProduct = {
    title: '',
    price: null as number | null,
    description: '',
    image: null as string | null
  };

  public recentOrders = signal([
    { id: '1', customer: 'John Doe', status: 'Pending', amount: 1200 },
    { id: '2', customer: 'Sara Khan', status: 'Pending', amount: 1450 },
    { id: '3', customer: 'Ali Abbas', status: 'Pending', amount: 980 }
  ]);

  openModal(type: string) {
    if (type === 'settings') {
      this.tempShopData = { ...this.shopData() };
    }
    this.activeModal.set(type);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.activeModal.set(null);
    document.body.style.overflow = 'auto';
  }

  triggerFileInput(id: string) {
    document.getElementById(id)?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleUpdateSettings() {
    this.shopData.set({ ...this.tempShopData });
    alert('Shop settings updated successfully!');
    this.closeModal();
  }

  toggleShopStatus() {
    this.tempShopData.isOpen = !this.tempShopData.isOpen;
  }

  handleAddProduct(event: Event) {
    event.preventDefault();
    if (this.newProduct.title && this.newProduct.price) {
      this.activeMenuCount.update((c: number) => c + 1);
      alert('Product "' + this.newProduct.title + '" has been added successfully!');
      this.newProduct = { title: '', price: null, description: '', image: null };
      this.closeModal();
    }
  }
}

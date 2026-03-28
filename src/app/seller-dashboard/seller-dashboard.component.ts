import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        <!-- Dashboard Summary Header -->
        <div class="bg-white rounded-[2.5rem] sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 transform transition-all">
          <div class="bg-[#FBCE07] p-6 sm:p-10 text-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div class="text-center sm:text-left space-y-1">
              <h1 class="text-3xl sm:text-4xl font-black tracking-tight mb-1">Seller Hub</h1>
              <p class="font-bold opacity-80 text-sm sm:text-lg">Shop: <span class="underline decoration-2-gray-800 underline-offset-4">{{ shopData().name }}</span></p>
            </div>
            
            <div class="flex items-center gap-4 bg-white/30 p-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-sm">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white border-2 border-white shadow-lg transition-colors" [class.bg-green-500]="shopData().isOpen" [class.bg-red-500]="!shopData().isOpen">
                <i class="fas" [class.fa-store]="shopData().isOpen" [class.fa-store-slash]="!shopData().isOpen"></i>
              </div>
              <div class="pr-4">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 mb-0.5">Live Status</p>
                <p class="text-xs font-black text-gray-900">{{ shopData().isOpen ? 'OPEN & ONLINE' : 'CLOSED' }}</p>
              </div>
            </div>
          </div>
          
          <div class="p-5 sm:p-10">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div class="bg-yellow-50 p-6 rounded-3xl border border-yellow-100 group hover:scale-[1.03] transition-transform">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Sales</p>
                <p class="text-3xl font-black text-gray-800">Rs. 12k+</p>
              </div>
              <div class="bg-blue-50 p-6 rounded-3xl border border-blue-100 group hover:scale-[1.03] transition-transform">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Orders</p>
                <p class="text-3xl font-black text-gray-800">{{ recentOrders().length }}</p>
              </div>
              <div class="bg-purple-50 p-6 rounded-3xl border border-purple-100 group hover:scale-[1.03] transition-transform">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Menu Items</p>
                <p class="text-3xl font-black text-gray-800">{{ myProducts().length }}</p>
              </div>
            </div>

            <!-- Dashboard Content Tabs -->
            <div class="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar pb-1">
              <button class="pb-4 text-sm font-black uppercase tracking-widest text-[#EAB308] border-b-4 border-[#EAB308] whitespace-nowrap">My Menu Items</button>
              <button class="pb-4 text-sm font-black uppercase tracking-widest text-gray-300 hover:text-gray-500 transition-colors whitespace-nowrap">Recent Orders</button>
            </div>

            <!-- My Menu Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Add New Item Card -->
              <div (click)="openModal('product')" class="aspect-[4/5] bg-gray-50 rounded-[2.5rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FBCE07] hover:bg-yellow-50 transition-all">
                <div class="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-gray-300 group-hover:text-[#FBCE07] group-hover:scale-110 mb-4 transition-all">
                  <i class="fas fa-plus text-2xl"></i>
                </div>
                <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-800 transition-colors">Add New Item</p>
              </div>

              <!-- Product Cards -->
              <div *ngFor="let product of myProducts()" class="bg-white p-5 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-2xl transition-all flex flex-col relative overflow-hidden">
                <div class="aspect-square bg-gray-100 rounded-3xl mb-4 overflow-hidden relative shadow-inner">
                   <img *ngIf="product.mainImage" [src]="product.mainImage" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                   <div *ngIf="!product.mainImage" class="w-full h-full flex items-center justify-center text-gray-200">
                     <i class="fas fa-utensils text-5xl"></i>
                   </div>
                   <div class="absolute top-4 left-4 px-3 py-1 bg-gray-800/80 backdrop-blur rounded-full text-[10px] font-black text-white shadow-xl">PKR {{product.price}}</div>
                </div>
                <h4 class="font-black text-xl text-gray-800 mb-2 truncate">{{ product.title }}</h4>
                <p class="text-xs text-gray-400 font-bold leading-relaxed line-clamp-2 mb-6 flex-grow">{{ product.description || 'Premium menu item prepared fresh by ' + shopData().name }}</p>
                <div class="flex justify-between items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                  <button class="flex-grow py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#EAB308] hover:bg-yellow-50 transition-colors active:scale-95">Edit Item</button>
                  <button (click)="deleteProduct(product.id)" class="w-12 py-3 bg-gray-50 rounded-2xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors active:scale-95 flex items-center justify-center"><i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Actions Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 class="text-xl font-black text-gray-800 mb-8 uppercase tracking-widest flex items-center gap-3">
              <i class="fas fa-tools text-[#FBCE07]"></i> Management
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <button (click)="openModal('settings')" class="w-full py-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-[#FBCE07] hover:bg-white hover:shadow-lg transition-all flex items-center px-8 group">
                <div class="w-10 h-10 bg-[#FBCE07]/10 rounded-xl flex items-center justify-center text-[#EAB308] group-hover:scale-110 transition-transform mr-4">
                  <i class="fas fa-cog"></i>
                </div>
                <div class="text-left">
                  <p class="text-sm font-black text-gray-800">Store Configuration</p>
                  <p class="text-[10px] text-gray-400 font-bold">Manage store name, contact & visibility</p>
                </div>
                <i class="fas fa-chevron-right ml-auto text-gray-200 group-hover:text-[#FBCE07] transition-all"></i>
              </button>
            </div>
          </div>

          <div class="bg-gray-800 p-8 rounded-[2.5rem] shadow-xl text-white outline outline-4 outline-transparent hover:outline-yellow-400/20 transition-all">
             <div class="flex justify-between items-start mb-8">
               <h3 class="text-xl font-black uppercase tracking-widest">Analytics</h3>
               <span class="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full">+12.5%</span>
             </div>
             <div class="flex items-end gap-2 h-24 mb-6">
                <div *ngFor="let h of [40, 70, 45, 90, 65, 80, 55]" [style.height.%]="h" class="flex-grow bg-white/10 hover:bg-[#FBCE07] transition-all rounded-lg"></div>
             </div>
             <p class="text-xs font-bold text-gray-400">Weekly revenue is up compared to last month. Keep it up!</p>
          </div>
        </div>
      </div>

      <!-- ADD PRODUCT MODAL -->
      @if (activeModal() === 'product') {
        <div class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md animate-fade-in">
          <div class="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
            <div class="bg-[#FBCE07] p-8 flex justify-between items-center shrink-0">
               <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-gray-800 shadow-sm">
                   <i class="fas fa-plus-circle text-2xl"></i>
                 </div>
                 <h3 class="text-2xl font-black text-gray-800 uppercase tracking-tight">Create Menu Item</h3>
               </div>
               <button (click)="closeModal()" class="w-12 h-12 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"><i class="fas fa-times text-gray-800"></i></button>
            </div>
            
            <div class="p-8 overflow-y-auto no-scrollbar">
               <form (submit)="handleAddProduct($event)" class="space-y-8">
                 <!-- Main Details -->
                 <div class="grid grid-cols-2 gap-6">
                   <div class="col-span-2 sm:col-span-1 space-y-2">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Item Title</label>
                     <input type="text" name="title" [(ngModel)]="newProduct.title" placeholder="Special Mutton Karahi" class="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold text-gray-700 focus:ring-4 focus:ring-[#FBCE07]/20 border-0 outline-none transition-all placeholder:text-gray-300">
                   </div>
                   <div class="col-span-2 sm:col-span-1 space-y-2">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Price (PKR)</label>
                     <input type="number" name="price" [(ngModel)]="newProduct.price" placeholder="1250" class="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold text-gray-700 focus:ring-4 focus:ring-[#FBCE07]/20 border-0 outline-none transition-all placeholder:text-gray-300">
                   </div>
                 </div>

                 <div class="space-y-2">
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Flavor Description</label>
                    <textarea name="desc" [(ngModel)]="newProduct.description" placeholder="Describe the taste, ingredients, and uniqueness..." class="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold text-gray-700 focus:ring-4 focus:ring-[#FBCE07]/20 border-0 outline-none h-28 resize-none transition-all placeholder:text-gray-300"></textarea>
                 </div>

                 <!-- Photo Gallery Setup -->
                 <div class="space-y-4">
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Product Gallery (5 slots)</label>
                    <div class="grid grid-cols-5 gap-4">
                      <!-- Main Slot -->
                      <div class="col-span-3 aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative hover:border-[#FBCE07] transition-all" (click)="triggerFileInput('mainImg')">
                        <input type="file" id="mainImg" class="hidden" (change)="onFileSelected($event, 'main')" accept="image/*">
                        @if (newProduct.mainImage) {
                          <img [src]="newProduct.mainImage" class="w-full h-full object-cover">
                          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><i class="fas fa-sync-alt text-white text-3xl"></i></div>
                        } @else {
                          <i class="fas fa-image text-gray-300 group-hover:text-[#FBCE07] text-4xl mb-2 transition-colors"></i>
                          <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-800 transition-colors">Hero Image</p>
                        }
                      </div>

                      <!-- Secondary Slots (4 slots grid) -->
                      <div class="col-span-2 grid grid-cols-2 grid-rows-2 gap-3">
                        @for (img of newProduct.secondaryImages; track $index) {
                          <div class="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center group cursor-pointer overflow-hidden relative hover:border-[#FBCE07] transition-all" (click)="triggerFileInput('secImg' + $index)">
                            <input type="file" [id]="'secImg' + $index" class="hidden" (change)="onFileSelected($event, $index)" accept="image/*">
                            @if (img) {
                              <img [src]="img" class="w-full h-full object-cover">
                              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><i class="fas fa-trash text-white text-sm"></i></div>
                            } @else {
                              <i class="fas fa-plus text-gray-300 text-sm group-hover:text-[#FBCE07] transition-colors"></i>
                            }
                          </div>
                        }
                      </div>
                    </div>
                 </div>

                 <div class="pt-4">
                   <button type="submit" class="w-full py-5 bg-[#FBCE07] text-gray-800 font-black rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all border-b-8 border-[#EAB308] uppercase tracking-widest">
                     Publish to Menu
                   </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      }

      <!-- SHOP SETTINGS MODAL -->
      @if (activeModal() === 'settings') {
        <div class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md animate-fade-in">
          <div class="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up">
             <div class="bg-gray-800 p-8 text-white flex justify-between items-center">
               <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><i class="fas fa-sliders-h text-xl"></i></div>
                 <h3 class="text-2xl font-black uppercase tracking-tight">Shop Settings</h3>
               </div>
               <button (click)="closeModal()" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><i class="fas fa-times text-white"></i></button>
            </div>
            <div class="p-8 space-y-8">
              <div (click)="toggleShopStatus()" class="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 cursor-pointer group transition-all hover:bg-white hover:shadow-lg">
                 <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-md" [class.bg-green-100]="tempShopData.isOpen" [class.bg-red-100]="!tempShopData.isOpen">
                   <i class="fas" [class.fa-door-open]="tempShopData.isOpen" [class.fa-door-closed]="!tempShopData.isOpen" [class.text-green-600]="tempShopData.isOpen" [class.text-red-600]="!tempShopData.isOpen" class="text-xl"></i>
                 </div>
                 <div class="flex-grow">
                   <p class="text-xs font-black text-gray-800 mb-0.5">Live Status</p>
                   <p class="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{{ tempShopData.isOpen ? 'Accepting Orders' : 'Offline / Closed' }}</p>
                 </div>
                 <div class="w-14 h-7 rounded-full relative transition-all duration-500 shadow-inner" [class.bg-green-500]="tempShopData.isOpen" [class.bg-gray-300]="!tempShopData.isOpen">
                    <div class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500" [style.left.px]="tempShopData.isOpen ? 34 : 4"></div>
                 </div>
              </div>

              <div class="space-y-6">
                <div class="space-y-2">
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Shop Display Name</label>
                  <input type="text" name="sName" [(ngModel)]="tempShopData.name" class="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-gray-100 border-0 transition-all">
                </div>
                <div class="space-y-2">
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Customer Hotline</label>
                  <input type="text" name="sContact" [(ngModel)]="tempShopData.contact" class="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold text-gray-700 outline-none focus:ring-4 focus:ring-gray-100 border-0 transition-all">
                </div>
              </div>

              <button (click)="handleUpdateSettings()" class="w-full py-5 bg-gray-800 hover:bg-black text-white font-black rounded-[2rem] transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest">Apply Store Changes</button>
            </div>
          </div>
        </div>
      }
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
    mainImage: null as string | null,
    secondaryImages: [null, null, null, null] as (string | null)[]
  };

  public myProducts = signal<any[]>([
    { id: 1, title: 'Chicken Biryani Special', price: 450, mainImage: null, description: 'Saffron infused basmati rice with tender chicken and secret spices.' },
    { id: 2, title: 'Shahi Mutton Karahi', price: 1250, mainImage: null, description: 'Traditional Peshawari style mutton cooked in a heavy iron wok.' },
    { id: 3, title: 'Garlic Butter Naan', price: 80, mainImage: null, description: 'Freshly baked tandoori bread with a glaze of herbal garlic butter.' }
  ]);

  public recentOrders = signal([
    { id: '1', customer: 'John Doe', status: 'In Kitchen', amount: 1200 },
    { id: '2', customer: 'Sara Khan', status: 'Ready', amount: 1450 },
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

  onFileSelected(event: any, index: number | 'main') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (index === 'main') {
          this.newProduct.mainImage = e.target.result;
        } else {
          this.newProduct.secondaryImages[index] = e.target.result;
        }
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

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to remove this item from your menu?')) {
      this.myProducts.update(prev => prev.filter(p => p.id !== id));
      this.activeMenuCount.set(this.myProducts().length);
    }
  }

  handleAddProduct(event: Event) {
    event.preventDefault();
    if (this.newProduct.title && this.newProduct.price) {
      const product = { 
        ...this.newProduct, 
        id: Date.now() 
      };
      this.myProducts.update(prev => [product, ...prev]);
      this.activeMenuCount.set(this.myProducts().length);
      
      alert('Product "' + this.newProduct.title + '" has been added to your menu!');
      
      // Reset form and close
      this.newProduct = { 
        title: '', 
        price: null, 
        description: '', 
        mainImage: null, 
        secondaryImages: [null, null, null, null] 
      };
      this.closeModal();
    } else {
      alert('Please fill in at least the Title and Price.');
    }
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div class="bg-[#FBCE07] p-8 text-gray-800">
            <h1 class="text-3xl font-black mb-2">Seller Dashboard</h1>
            <p class="font-medium opacity-90">Welcome back, {{ authService.currentUser()?.firstName || 'Vendor' }}! Manage your store and orders here.</p>
          </div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div class="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-[#FBCE07] rounded-xl flex items-center justify-center text-xl shadow-sm">
                  <i class="fas fa-shopping-bag"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</p>
                  <p class="text-2xl font-black text-gray-800">24</p>
                </div>
              </div>
              
              <div class="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl shadow-sm">
                  <i class="fas fa-wallet"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Earnings</p>
                  <p class="text-2xl font-black text-gray-800">Rs. 12,450</p>
                </div>
              </div>
              
              <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl shadow-sm">
                  <i class="fas fa-utensils"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Products</p>
                  <p class="text-2xl font-black text-gray-800">18</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-black text-gray-800">Recent Orders</h2>
              <button class="text-[#EAB308] font-bold text-sm hover:underline">View all orders</button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th class="pb-4">Order ID</th>
                    <th class="pb-4">Customer</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4">Amount</th>
                    <th class="pb-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr *ngFor="let order of [1,2,3]" class="group">
                    <td class="py-4 font-bold text-gray-800">#ORD-00{{order}}</td>
                    <td class="py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">JD</div>
                        <span class="text-sm font-medium text-gray-600">John Doe</span>
                      </div>
                    </td>
                    <td class="py-4">
                      <span class="px-3 py-1 bg-yellow-100 text-[#EAB308] text-[10px] font-black rounded-full uppercase">Pending</span>
                    </td>
                    <td class="py-4 font-black text-gray-800">Rs. 1,200</td>
                    <td class="py-4 text-right">
                      <button class="text-gray-400 hover:text-[#FBCE07] transition-colors"><i class="fas fa-ellipsis-h"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 class="text-lg font-black text-gray-800 mb-6">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-4">
              <button class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all group">
                <i class="fas fa-plus text-2xl text-gray-300 group-hover:text-[#FBCE07] mb-3"></i>
                <span class="text-sm font-bold text-gray-600 group-hover:text-gray-800">Add Product</span>
              </button>
              <button class="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all group">
                <i class="fas fa-cog text-2xl text-gray-300 group-hover:text-[#FBCE07] mb-3"></i>
                <span class="text-sm font-bold text-gray-600 group-hover:text-gray-800">Shop Settings</span>
              </button>
            </div>
          </div>

          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 class="text-lg font-black text-gray-800 mb-6">Store Performance</h3>
            <div class="h-40 flex items-end justify-between gap-2 px-2">
              <div *ngFor="let h of [40, 70, 45, 90, 65, 80, 55]" [style.height.%]="h" class="flex-grow bg-[#FBCE07]/30 hover:bg-[#FBCE07] transition-all rounded-t-lg relative group">
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rs. {{h*100}}</div>
              </div>
            </div>
            <div class="flex justify-between mt-4 px-2">
              <span *ngFor="let day of ['M', 'T', 'W', 'T', 'F', 'S', 'S']" class="text-[10px] font-black text-gray-400">{{day}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `
})
export class SellerDashboardComponent {
  public authService = inject(AuthService);
}

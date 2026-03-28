import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-rider-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div class="bg-[#FBCE07] p-8 text-gray-800">
            <h1 class="text-3xl font-black mb-2">Rider Dashboard</h1>
            <p class="font-medium opacity-90">Hello, {{ authService.currentUser()?.firstName || 'Rider' }}! Ready for some deliveries? Stay safe on the road.</p>
          </div>
          
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
              <div class="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Today's Earnings</p>
                <p class="text-3xl font-black text-gray-800">Rs. 1,850</p>
              </div>
              <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Items Delivered</p>
                <p class="text-3xl font-black text-gray-800">12</p>
              </div>
              <div class="bg-green-50 p-6 rounded-2xl border border-green-100">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Working Hours</p>
                <p class="text-3xl font-black text-gray-800">6.5h</p>
              </div>
            </div>

            <div class="bg-gray-800 text-white p-6 rounded-2xl mb-8 flex items-center justify-between shadow-lg">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
                  <i class="fas fa-motorcycle"></i>
                </div>
                <div>
                  <h3 class="text-lg font-black tracking-tight">Status: Available</h3>
                  <p class="text-gray-400 text-xs font-bold uppercase">Waiting for next order</p>
                </div>
              </div>
              <button class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md">Go Offline</button>
            </div>

            <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 class="text-xl font-black text-gray-800">Available Tasks</h2>
              <span class="bg-yellow-100 text-[#EAB308] px-3 py-1 rounded-full text-xs font-black uppercase">2 Nearby</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div *ngFor="let task of [1,2]" class="bg-white border-2 border-dashed border-gray-100 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all p-6 rounded-[2rem] group">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-[10px] font-black text-[#EAB308] uppercase tracking-widest">Urgent Delivery</span>
                  <span class="text-sm font-black text-gray-800">Rs. 350 + Tip</span>
                </div>
                <div class="space-y-4 mb-6">
                  <div class="flex items-start gap-3">
                    <i class="fas fa-store text-[#FBCE07] mt-1"></i>
                    <div>
                      <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Pickup</p>
                      <p class="text-sm font-bold text-gray-800">Al-Madina Caterers, DHA Phase 5</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3 pl-0.5 border-l-2 border-dashed border-gray-100 ml-1.5 py-1"></div>
                  <div class="flex items-start gap-3">
                    <i class="fas fa-map-marker-alt text-red-500 mt-1"></i>
                    <div>
                      <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Drop-off</p>
                      <p class="text-sm font-bold text-gray-800">Street 24, Block L, Gulberg III</p>
                    </div>
                  </div>
                </div>
                <button class="w-full py-3 bg-[#FBCE07] hover:bg-[#EAB308] text-gray-800 font-black rounded-2xl shadow-md transition-all group-hover:-translate-y-1 active:translate-y-0 border-b-4 border-[#EAB308]">Accept Task</button>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Recent Activity -->
          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
             <h3 class="text-lg font-black text-gray-800 mb-6">Recent Activity</h3>
             <div class="space-y-4">
                <div *ngFor="let a of [1,2,3]" class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                   <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 text-sm">
                         <i class="fas fa-check"></i>
                      </div>
                      <div>
                         <p class="text-sm font-bold text-gray-800">Order Delivered</p>
                         <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">15 mins ago</p>
                      </div>
                   </div>
                   <p class="text-sm font-black text-gray-800">+ Rs. 180</p>
                </div>
             </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
             <h3 class="text-lg font-black text-gray-800 mb-6 font-black uppercase tracking-widest">Performance Stats</h3>
             <div class="grid grid-cols-2 gap-4">
                <div class="p-6 bg-gray-50 rounded-2xl text-center">
                   <div class="text-yellow-500 text-2xl mb-1">
                      <i class="fas fa-star"></i>
                   </div>
                   <p class="text-2xl font-black text-gray-800">4.9</p>
                   <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                </div>
                <div class="p-6 bg-gray-50 rounded-2xl text-center">
                   <div class="text-blue-500 text-2xl mb-1">
                      <i class="fas fa-percent"></i>
                   </div>
                   <p class="text-2xl font-black text-gray-800">98%</p>
                   <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `
})
export class RiderDashboardComponent {
  public authService = inject(AuthService);
}

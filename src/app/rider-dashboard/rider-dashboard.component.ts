import { Component, inject, signal } from '@angular/core';
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
    
    <div class="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 px-3 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-[2rem] sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-6 sm:mb-8">
          <div class="bg-[#FBCE07] p-5 sm:p-8 text-gray-800">
            <h1 class="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-center sm:text-left">Rider Dashboard</h1>
            <p class="font-medium opacity-90 text-sm sm:text-base text-center sm:text-left">Hello, {{ authService.currentUser()?.firstName || 'Rider' }}! Stay safe on the road.</p>
          </div>
          
          <div class="p-4 sm:p-8">
            <!-- Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-8 text-center">
              <div class="bg-yellow-50 p-4 sm:p-6 rounded-2xl border border-yellow-100 flex flex-col items-center justify-center">
                <p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Earnings</p>
                <p class="text-xl sm:text-3xl font-black text-gray-800">Rs. {{ todayEarnings() }}</p>
              </div>
              <div class="bg-blue-50 p-4 sm:p-6 rounded-2xl border border-blue-100 flex flex-col items-center justify-center">
                <p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivered</p>
                <p class="text-xl sm:text-3xl font-black text-gray-800">{{ itemsDelivered() }}</p>
              </div>
              <div class="bg-green-50 p-4 sm:p-6 rounded-2xl border border-green-100 flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                <p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Working Hours</p>
                <p class="text-xl sm:text-3xl font-black text-gray-800">6.5h</p>
              </div>
            </div>

            <!-- Status Bar -->
            <div class="p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:shadow-lg transition-all duration-500 shadow-md"
              [class.bg-gray-800]="isOnline()" [class.bg-gray-400]="!isOnline()" [class.text-white]="true">
              <div class="flex items-center gap-4 w-full sm:w-auto">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl sm:text-2xl transition-all duration-500"
                  [class.bg-green-500]="isOnline()" [class.bg-gray-600]="!isOnline()" [class.animate-pulse]="isOnline()">
                  <i class="fas" [class.fa-motorcycle]="isOnline()" [class.fa-moon]="!isOnline()"></i>
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-black tracking-tight">Status: {{ isOnline() ? 'Available' : 'Offline' }}</h3>
                  <p class="text-gray-200 text-[10px] sm:text-xs font-bold uppercase">{{ isOnline() ? 'Waiting for order' : 'Resting' }}</p>
                </div>
              </div>
              <button (click)="toggleStatus()" 
                class="w-full sm:w-auto px-6 py-2.5 sm:py-2 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-md"
                [class.bg-red-500]="isOnline()" [class.hover:bg-red-600]="isOnline()"
                [class.bg-green-500]="!isOnline()" [class.hover:bg-green-600]="!isOnline()">
                {{ isOnline() ? 'Go Offline' : 'Go Online' }}
              </button>
            </div>

            <div class="flex justify-between items-center mb-4 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
              <h2 class="text-lg sm:text-xl font-black text-gray-800">Available Tasks</h2>
              <span class="bg-yellow-100 text-[#EAB308] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-black uppercase" *ngIf="isOnline()">{{ availableTasks().length }} Nearby</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative min-h-[150px] sm:min-h-[200px]">
              <div *ngIf="!isOnline() || availableTasks().length === 0" class="col-span-full flex flex-col items-center justify-center py-8 sm:py-10 text-gray-400 text-center">
                <i class="fas fa-box-open text-4xl sm:text-5xl mb-3"></i>
                <p class="font-bold text-sm sm:text-base">No tasks available right now.</p>
              </div>

              <ng-container *ngIf="isOnline()">
                <div *ngFor="let task of availableTasks()" class="bg-white border-2 border-dashed border-gray-100 hover:border-[#FBCE07] hover:bg-yellow-50 transition-all p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] group animate-fade-in shadow-sm relative overflow-hidden">
                  <div class="flex items-center justify-between mb-3 sm:mb-4">
                    <span class="text-[9px] sm:text-[10px] font-black text-[#EAB308] uppercase tracking-widest">{{ task.urgent ? 'Urgent' : 'Standard' }}</span>
                    <span class="text-xs sm:text-sm font-black text-gray-800">Rs. {{ task.pay }}</span>
                  </div>
                  <div class="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                    <div class="flex items-start gap-3">
                      <div class="w-6 h-6 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-store text-[#FBCE07] text-[10px]"></i>
                      </div>
                      <div>
                        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Pickup</p>
                        <p class="text-xs font-bold text-gray-800 leading-tight">{{ task.pickup }}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3 pl-0.5 border-l-2 border-dashed border-gray-100 ml-3 py-1"></div>
                    <div class="flex items-start gap-3">
                      <div class="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-map-marker-alt text-red-500 text-[10px]"></i>
                      </div>
                      <div>
                        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Drop-off</p>
                        <p class="text-xs font-bold text-gray-800 leading-tight">{{ task.dropoff }}</p>
                      </div>
                    </div>
                  </div>
                  <button (click)="acceptTask(task)" class="w-full py-2.5 sm:py-3 bg-[#FBCE07] hover:bg-[#EAB308] text-gray-800 font-black rounded-xl sm:rounded-2xl shadow-md transition-all group-hover:-translate-y-1 active:translate-y-0 border-b-4 border-[#EAB308] text-xs sm:text-sm">Accept Task</button>
                </div>
              </ng-container>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div class="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-3xl shadow-lg border border-gray-100">
             <div class="flex justify-between items-center mb-5 sm:mb-6">
               <h3 class="text-base sm:text-lg font-black text-gray-800 uppercase tracking-tight">Recent Activity</h3>
               <span class="text-[10px] font-bold text-gray-400 uppercase">Today</span>
             </div>
             <div class="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                <div *ngFor="let a of recentActivities()" class="flex items-center justify-between py-3 px-1 border-b border-gray-50 last:border-0 animate-slide-right">
                   <div class="flex items-center gap-3">
                      <div class="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 text-xs sm:text-sm">
                         <i class="fas" [class.fa-check]="a.status==='Delivered'" [class.fa-spinner]="a.status==='Moving'" [class.animate-spin]="a.status==='Moving'"></i>
                      </div>
                      <div>
                         <p class="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1">{{ a.pickup }}</p>
                         <p class="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ a.time }}</p>
                      </div>
                   </div>
                   <div class="text-right flex-shrink-0">
                    <p class="text-xs sm:text-sm font-black text-gray-800">Rs. {{ a.pay }}</p>
                    <span class="text-[8px] font-black uppercase" [class.text-green-500]="a.status==='Delivered'" [class.text-yellow-500]="a.status==='Moving'">{{ a.status }}</span>
                   </div>
                </div>
                <div *ngIf="recentActivities().length === 0" class="py-8 text-center text-gray-400">
                  <p class="font-bold text-xs">No activity yet.</p>
                </div>
             </div>
          </div>

          <div class="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-3xl shadow-lg border border-gray-100">
             <h3 class="text-base sm:text-lg font-black text-gray-800 mb-5 sm:mb-6 uppercase tracking-tight">Performance</h3>
             <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div class="p-4 sm:p-6 bg-gray-50 rounded-2xl text-center">
                   <div class="text-yellow-500 text-xl sm:text-2xl mb-1">
                      <i class="fas fa-star"></i>
                   </div>
                   <p class="text-xl sm:text-2xl font-black text-gray-800">4.9</p>
                   <p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                </div>
                <div class="p-4 sm:p-6 bg-gray-50 rounded-2xl text-center">
                   <div class="text-blue-500 text-xl sm:text-2xl mb-1">
                      <i class="fas fa-percent"></i>
                   </div>
                   <p class="text-xl sm:text-2xl font-black text-gray-800">98%</p>
                   <p class="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Success</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    .animate-slide-right { animation: slideRight 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideRight { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #FBCE07; border-radius: 10px; }
  `]
})
export class RiderDashboardComponent {
  public authService = inject(AuthService);
  
  public isOnline = signal(true);
  public todayEarnings = signal(1850);
  public itemsDelivered = signal(12);

  public availableTasks = signal([
    { id: 1, pickup: 'Al-Madina Caterers, DHA Phase 5', dropoff: 'Street 24, Block L, Gulberg III', pay: 350, urgent: true },
    { id: 2, pickup: 'Pizza Hut, Blue Area', dropoff: 'DHA Phase 2, Gate 1', pay: 280, urgent: false },
    { id: 3, pickup: 'Student Biryani, Saddar', dropoff: 'Westridge Rawalpindi', pay: 450, urgent: true },
  ]);

  public recentActivities = signal([
    { id: 101, pickup: 'KFC Express', pay: 180, time: '15 mins ago', status: 'Delivered' },
    { id: 102, pickup: 'Gourmet Bakers', pay: 120, time: '1 hour ago', status: 'Delivered' }
  ]);

  toggleStatus() {
    this.isOnline.set(!this.isOnline());
  }

  acceptTask(task: any) {
    // 1. Remove from available
    this.availableTasks.update(tasks => tasks.filter(t => t.id !== task.id));
    
    // 2. Add to recent (as moving status)
    const newActivity = {
      id: Date.now(),
      pickup: task.pickup,
      pay: task.pay,
      time: 'Just now',
      status: 'Moving'
    };
    
    this.recentActivities.update(acts => [newActivity, ...acts]);
    
    // 3. Update stats
    this.todayEarnings.update(e => e + task.pay);
    this.itemsDelivered.update(i => i + 1);

    // 4. Simulate delivery completion after 5 seconds
    setTimeout(() => {
      this.recentActivities.update(acts => 
        acts.map(a => a.id === newActivity.id ? { ...a, status: 'Delivered' } : a)
      );
    }, 5000);
  }
}

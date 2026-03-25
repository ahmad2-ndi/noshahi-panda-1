import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ========== NEW FOOTER SECTION ========== -->
    <footer class="mt-20 relative">
      <!-- Footer Background Wrapper -->
      <div class="footer-dark text-white pt-20 pb-12">
        <!-- Newsletter Banner (Moved inside for consistent context) -->
        <div class="max-w-7xl mx-auto px-4 mb-20">
          <div
            class="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 overflow-hidden border-4 border-white/10">
            <div class="md:w-1/3 w-full h-56 relative overflow-hidden rounded-2xl group">
              <img src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=600"
                alt="Food Newsletter"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-gray-800 shadow-lg">
                  <i class="fas fa-play ml-1"></i>
                </div>
              </div>
            </div>
            <div class="md:w-2/3 w-full text-left">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-custom-yellow font-bold uppercase tracking-widest text-xs">Newsletters</span>
                <div class="h-[1px] w-12 bg-custom-yellow/30"></div>
              </div>
              <h2 class="text-3xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">Subscribe our newsletter to get more free <span class="text-custom-yellow">offer</span></h2>
              <div class="relative max-w-md">
                <input type="email" placeholder="Enter your email" 
                  class="w-full py-4 pl-6 pr-32 rounded-2xl bg-gray-50 border-none shadow-inner focus:ring-2 focus:ring-custom-yellow text-gray-800 font-medium">
                <button class="absolute right-2 top-2 bottom-2 bg-gray-800 hover:bg-black text-white px-6 rounded-xl font-bold transition-all">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Logo & About -->
          <div class="space-y-6">
            <div class="flex flex-col">
              <span class="text-3xl font-black text-white tracking-tighter">NOSHAHI<br><span class="text-custom-yellow">PANDA</span></span>
              <div class="h-1 w-12 bg-custom-yellow mt-2 rounded-full"></div>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">The best food delivery service in Pakistan. We bring your favorite meals right to your doorstep, fresh and fast. Experience the joy of eating with Noshahi Panda.</p>
            <div class="flex gap-4">
              <a href="#" class="social-icon-circle"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-icon-circle"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-icon-circle"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-icon-circle"><i class="fab fa-youtube"></i></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-xl font-bold mb-8 flex items-center gap-3">
               Our Menus <div class="h-[2px] w-6 bg-custom-yellow/30"></div>
            </h4>
            <ul class="space-y-4">
              <li><a href="#" class="footer-link block">Chicken Burger</a></li>
              <li><a href="#" class="footer-link block">Beef Pizza</a></li>
              <li><a href="#" class="footer-link block">Fresh Vegetable</a></li>
              <li><a href="#" class="footer-link block">Seafood</a></li>
              <li><a href="#" class="footer-link block">Desserts</a></li>
            </ul>
          </div>

          <!-- Useful Links -->
          <div>
             <h4 class="text-xl font-bold mb-8 flex items-center gap-3">
               Useful Links <div class="h-[2px] w-6 bg-custom-yellow/30"></div>
            </h4>
            <ul class="space-y-4">
              <li><a href="#" class="footer-link block">About Us</a></li>
              <li><a href="#" class="footer-link block">Restaurant</a></li>
              <li><a href="#" class="footer-link block">Our Chefs</a></li>
              <li><a href="#" class="footer-link block">Testimonials</a></li>
              <li><a href="#" class="footer-link block">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-xl font-bold mb-8 flex items-center gap-3">
               Contact Us <div class="h-[2px] w-6 bg-custom-yellow/30"></div>
            </h4>
            <div class="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-custom-yellow/10 flex items-center justify-center text-custom-yellow shrink-0">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <p class="text-gray-400 text-sm leading-tight pt-1">F-10 Markaz, Islamabad,<br>Pakistan</p>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-custom-yellow/10 flex items-center justify-center text-custom-yellow shrink-0">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <p class="text-gray-400 text-sm leading-tight pt-1">+92 300 1234567<br>+92 51 9876543</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-gray-500 text-sm">© 2024 <span class="text-white font-bold">Noshahi Panda</span>. All rights reserved.</p>
          <div class="flex items-center gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" class="h-4 opacity-30 invert">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" class="h-6 opacity-30 invert">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" class="h-5 opacity-30 invert">
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}

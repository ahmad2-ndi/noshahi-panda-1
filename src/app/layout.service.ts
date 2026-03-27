import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public readonly userAddress = signal({
    name: '',
    email: '',
    street: '',
    city: 'Islamabad',
    province: 'Punjab',
    phone: ''
  });
  public readonly selectedPaymentMethod = signal('cod');
  public readonly currentAddress = signal('New address Islamabad');
  public readonly showCityDropdown = signal(false);
  public readonly citySearchQuery = signal('');
  public readonly activeTab = signal('delivery');
  public readonly showSignupModal = signal(false);
  public readonly initialAuthMode = signal<'login' | 'signup'>('login');
  public readonly activeSort = signal('Relevance');
  public readonly quickFilters = signal<Map<string, boolean>>(new Map());
  public readonly selectedCuisine = signal<string | null>(null);
  public readonly cartPulse = signal(0);
  public readonly showCart = signal(false);
  public readonly freeDeliveryThreshold = 2000;
  public readonly voucherCode = signal('');
  public readonly isScrolled = signal(false);
  public readonly isDesktop = signal(true);
  public readonly cartItems = signal<any[]>([]);
  public readonly isCartEmpty = computed(() => this.cartItems().length === 0);
  public readonly totalCartQuantity = computed(() => 
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  public readonly totalCartPrice = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );
  public readonly deliveryFee = computed(() => 
    (this.totalCartPrice() >= this.freeDeliveryThreshold || this.isCartEmpty()) ? 0 : 250
  );
  public readonly freeDeliveryProgress = computed(() => 
    Math.min((this.totalCartPrice() / this.freeDeliveryThreshold) * 100, 100)
  );
  public readonly amountToFreeDelivery = computed(() => 
    Math.max(this.freeDeliveryThreshold - this.totalCartPrice(), 0)
  );

  public readonly pakistaniCities = [
    "Abbottabad", "Attock", "Bahawalpur", "Bannu", "Bhakkar", "Buner", "Chakwal", "Chaman",
    "Charsadda", "Chiniot", "Dera Ghazi Khan", "Dera Ismail Khan", "Diamer", "Faisalabad",
    "Ghanche", "Gilgit", "Gujranwala", "Gujrat", "Gwadar", "Haripur", "Hunza", "Hyderabad",
    "Islamabad", "Jacobabad", "Jhang", "Jhelum", "Karak", "Karachi", "Kasur", "Khanewal", "Kharmang",
    "Khushab", "Khuzdar", "Kohat", "Kohistan", "Lahore", "Lakki Marwat", "Larkana", "Mandi Bahauddin",
    "Mansehra", "Mardan", "Mianwali", "Mingora", "Mirpur Khas", "Multan", "Muzaffargarh",
    "Nagar", "Nawabshah", "Nowshera", "Okara", "Panjgur", "Peshawar", "Quetta", "Rahim Yar Khan",
    "Rawalpindi", "Sahiwal", "Sargodha", "Shangla", "Shigar", "Shikarpur", "Sialkot", "Skardu",
    "Sukkur", "Swabi", "Tank", "Turbat", "Wah Cantonment", "Zhob"
  ].sort((a, b) => a.localeCompare(b));

  public readonly filteredCities = computed(() => {
    const query = this.citySearchQuery().toLowerCase();
    if (!query) return this.pakistaniCities;
    return this.pakistaniCities.filter(city => city.toLowerCase().includes(query));
  });

  public readonly tabs = [
    { id: 'delivery', label: 'Delivery', icon: 'fas fa-motorcycle' },
    { id: 'pickup', label: 'Pick-up', icon: 'fas fa-store' },
    { id: 'pandamart', label: 'Noshahi panda mart', icon: 'fas fa-box-open' },
    { id: 'shops', label: 'Shops', icon: 'fas fa-shopping-bag' },
    { id: 'caterers', label: 'Caterers', icon: 'fas fa-utensil-spoon' },
    { id: 'track-order', label: 'Track My Order', icon: 'fas fa-search-location' }
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.isDesktop.set(window.innerWidth >= 768);

      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });

      window.addEventListener('resize', () => {
        this.isDesktop.set(window.innerWidth >= 768);
      });

      document.addEventListener('click', () => {
        if (this.showCityDropdown()) {
          this.showCityDropdown.set(false);
        }
      });
    }

    // Body Scroll Lock when Cart is open
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.showCart()) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  }

  public toggleCityDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.showCityDropdown.set(!this.showCityDropdown());
    if (this.showCityDropdown()) {
      this.citySearchQuery.set('');
    }
  }

  public filterCities(event: any) {
    this.citySearchQuery.set(event.target.value);
  }

  public updateLocation(city: string) {
    const cleanCity = city.trim().replace(/^New address /, '');
    this.currentAddress.set('New address ' + cleanCity);
    this.showCityDropdown.set(false);
  }

  public selectFirstCity(event: Event) {
    event.preventDefault();
    const matches = this.filteredCities();
    if (matches.length > 0) {
      this.updateLocation(matches[0]);
    } else if (this.citySearchQuery()) {
      this.updateLocation(this.citySearchQuery());
    }
  }

  public toggleQuickFilter(filter: string) {
    const current = new Map(this.quickFilters());
    current.set(filter, !current.get(filter));
    this.quickFilters.set(current);
  }

  public toggleCuisine(cuisine: string) {
    if (this.selectedCuisine() === cuisine) {
      this.selectedCuisine.set(null);
    } else {
      this.selectedCuisine.set(cuisine);
    }
  }

  public openSignupModal(mode: 'login' | 'signup' = 'login') {
    this.initialAuthMode.set(mode);
    this.showSignupModal.set(true);
  }

  public addToCart(product: any, quantity: number) {
    const currentItems = [...this.cartItems()];
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex] = {
        ...currentItems[existingItemIndex],
        quantity: currentItems[existingItemIndex].quantity + quantity
      };
    } else {
      currentItems.push({ ...product, quantity });
    }

    this.cartItems.set(currentItems);
    this.cartPulse.update(v => v + 1);
  }

  public removeFromCart(productId: number) {
    this.cartItems.set(this.cartItems().filter(item => item.id !== productId));
  }

  public updateQuantity(productId: number, delta: number) {
    const currentItems = [...this.cartItems()];
    const index = currentItems.findIndex(item => item.id === productId);
    if (index > -1) {
      const newQty = currentItems[index].quantity + delta;
      if (newQty > 0) {
        currentItems[index] = { ...currentItems[index], quantity: newQty };
        this.cartItems.set(currentItems);
      } else {
        this.removeFromCart(productId);
      }
    }
  }
}

import { Component, signal, computed } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    imports: [NgIf]
})
export class HomeComponent {
    // --- Signals & State ---
    public readonly currentAddress = signal('New address Islamabad');
    public readonly showCityDropdown = signal(false);
    public readonly citySearchQuery = signal('');
    public readonly activeTab = signal('delivery');
    public readonly showSignupModal = signal(false);
    public readonly activeSort = signal('Relevance');
    public readonly quickFilters = signal<Map<string, boolean>>(new Map());
    public readonly priceFilter = signal<string | null>(null);
    public readonly ratingFilter = signal<number | null>(null);
    public readonly isScrolled = signal(false);
    public readonly isDesktop = signal(true);
    public readonly showStickyBanner = signal(true);

    // --- Data ---
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
        { id: 'caterers', label: 'Caterers', icon: 'fas fa-utensil-spoon' }
    ];

    public readonly sortOptions = [
        "Relevance", "Fastest delivery", "Distance", "Top rated", "Promotions", "Price: Low to High"
    ];

    public readonly offers = ["Free delivery", "Accepts vouchers", "Deals"];

    public readonly sideCuisines = [
        "American", "BBQ", "Beverages", "Biryani", "Broast", "Burgers", "Cakes & Bakery", "Chinese",
        "Fast Food", "Pizza", "Pakistani", "Halwa Puri", "Paratha"
    ];

    public readonly mainCuisines = [
        { name: 'Fast Food', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=200' },
        { name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=200' },
        { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200' },
        { name: 'Pakistani', image: 'images/pakistani.png' },
        { name: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=200' },
        { name: 'Halwa Puri', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=200' },
        { name: 'Paratha', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=200' }
    ];

    public readonly dailyDeals = [
        { title: 'World Cup deals', discount: 'Up to 30% off', image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=300' },
        { title: 'World Cup deal', discount: 'Deal for Rs.590', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300', logo: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png', discountClass: 'text-[#EAB308] text-xl md:text-2xl font-black mb-1' }
    ];

    public readonly homeChefs = [
        {
            name: 'Food Inbox',
            rating: '4.7',
            reviews: '1000+',
            priceLevel: '$',
            time: '20-45 min',
            cuisine: 'Pakistani',
            delivery: 'Free',
            offer: '10% off',
            image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=400',
            isHomeChef: true,
            isAd: true,
            isAvailable: true,
            isSuper: true,
            badges: ['Saver', 'Free delivery']
        },
        {
            name: 'Suadish Biryani – Bl...',
            rating: '4.2',
            reviews: '500+',
            priceLevel: '$',
            time: '5-25 min',
            cuisine: 'Pakistani',
            delivery: 'Rs.75',
            offer: '15% off',
            image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400',
            isAvailable: true,
            badges: ['In-Store Price']
        },
        {
            name: 'Suadish Biryani ...',
            rating: '4.8',
            reviews: '100+',
            priceLevel: '$$',
            time: '10-35 min',
            cuisine: 'Pakistani',
            delivery: 'Rs.75',
            offer: '15% off',
            image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400',
            isAvailable: false,
            closedUntil: '17:00',
            badges: []
        },
        {
            name: 'Mummy\'s Kitchen',
            rating: '4.5',
            reviews: '100+',
            priceLevel: '$',
            time: '25-50 min',
            cuisine: 'Pak',
            delivery: 'Rs.79',
            offer: 'Up to 15% off',
            image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400',
            isAvailable: true,
            badges: ['New']
        }
    ];

    public readonly filteredHomeChefs = computed(() => {
        const filters = this.quickFilters();
        const sortKey = this.activeSort();

        const parseMinTime = (time: string) => {
            const match = time.match(/(\d+)(?:-(\d+))?/);
            if (!match) return Number.MAX_SAFE_INTEGER;
            return Number(match[1]);
        };

        const parsePrice = (priceLevel: string) => (priceLevel.match(/\$/g) || []).length;

        let list = [...this.homeChefs];

        if (filters.get('ratings')) {
            list = list.filter(chef => Number(chef.rating) >= 4);
        }

        if (filters.get('super')) {
            list = list.filter(chef => !!chef.isSuper);
        }

        if (filters.get('Free delivery')) {
            list = list.filter(chef => chef.delivery?.toLowerCase() === 'free');
        }

        if (filters.get('Deals')) {
            list = list.filter(chef => !!chef.offer);
        }

        // Sort
        if (sortKey === 'Fastest delivery') {
            list.sort((a, b) => parseMinTime(a.time) - parseMinTime(b.time));
        } else if (sortKey === 'Top rated') {
            list.sort((a, b) => Number(b.rating) - Number(a.rating));
        } else if (sortKey === 'Price: Low to High') {
            list.sort((a, b) => parsePrice(a.priceLevel) - parsePrice(b.priceLevel));
        }

        return list;
    });

    public readonly pickupRestaurants = computed(() => {
        // For pickup we show only currently available chefs and highlight home-chef options
        return this.homeChefs.filter(chef => chef.isAvailable);
    });

    public readonly topBrands = [
        { name: 'KFC', time: '30 min', logo: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png' },
        { name: 'Layers Bakeshop', time: '10 min', logo: 'images/layers.jpg', bgColor: '#F5F5F5' },
        { name: 'Broadway', time: '20 min', logo: 'images/broadway.jpg', bgColor: '#006838', invert: true },
        { name: 'Burger Lab', time: '25 min', logo: 'images/burgerlabs.jpg', bgColor: 'black' }
    ];

    public readonly pepsiDeals = [
        { name: 'BRIM Burgers – F7', rating: '4.6', reviews: '1000+', time: '15-40 min', price: '$$$', category: 'Burgers', deliveryInfo: 'from Rs.104 with Saver', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', isAd: true },
        { name: 'KFC – Islamabad F-9', rating: '4.5', reviews: '500+', time: '30-55 min', price: '$$', category: 'Fast Food', deliveryInfo: 'Rs.50', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
        { name: 'Savour Foods ...', rating: '4.9', reviews: '50000+', time: '15-40 min', price: '$$', category: 'Pakistani', deliveryInfo: 'from Rs.124 with Saver', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
        { name: 'Subway – F', rating: '4.9', reviews: '50000+', time: '5-30 min', price: '$$', category: 'San', deliveryInfo: 'from Rs.104 with', image: 'images/subway.jpg' }
    ];

    public readonly topShops = [
        { name: 'Time out (Jinah Avenue)', time: '10 min', logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=200', isShop: true },
        { name: 'Time Out – (New Blue Area)', time: '10 min', logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=200', isShop: true },
        { name: 'Punjab Fresh Fruits &...', time: '15 min', logo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=200' },
        { name: 'Allure Beauty', time: '20 min', logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200', isBeauty: true }
    ];

    public readonly pakistaniCitiesGrid = [
        { name: 'Islamabad', image: 'https://images.unsplash.com/photo-1664185494391-3c6c78244473?auto=format&fit=crop&w=500' },
        { name: 'Karachi', image: 'https://images.unsplash.com/photo-1611068661807-c850d6a24f62?auto=format&fit=crop&w=500' },
        { name: 'Lahore', image: 'https://images.unsplash.com/photo-1599079027267-7d0cea474b07?auto=format&fit=crop&w=500' },
        { name: 'Faisalabad', image: 'https://images.unsplash.com/photo-1596798432210-63839ee4c486?auto=format&fit=crop&w=500' },
        { name: 'Rawalpindi', image: 'https://images.unsplash.com/photo-1720507334744-02dce2b6794d?auto=format&fit=crop&w=500' },
        { name: 'Multan', image: 'https://images.unsplash.com/photo-1598461814968-639d9321f483?auto=format&fit=crop&w=500' },
        { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1587966606400-22bd02e9b907?auto=format&fit=crop&w=500' },
        { name: 'Peshawar', image: 'https://images.unsplash.com/photo-1679809470940-d7d0cea474b0?auto=format&fit=crop&w=500' },
        { name: 'Quetta', image: 'https://images.unsplash.com/photo-1646606161337-d644f966e672?auto=format&fit=crop&w=500' }
    ];

    public readonly partnerCards = [
        { title: 'List your restaurant or shop', description: 'Would you like millions of new customers to enjoy your amazing food and goods? So would we!', buttonText: 'Get started', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600' },
        { title: 'Become a rider', description: 'Enjoy flexibility, freedom and competitive earnings by delivering through foodpanda.', buttonText: 'Get started', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600' },
        { title: 'foodpanda for business', description: 'Order lunch or fuel for your team or book pandago for your business needs.', buttonText: 'Get started', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' }
    ];

    public readonly footerColumns = [
        {
            title: 'Our Menus',
            links: ['Chicken Burger', 'Brief Pizza', 'Fresh Vegetable', 'Sea Foods', 'Desserts', 'Cold Drinks', 'Discount']
        },
        {
            title: 'Useful Links',
            links: ['About Us', 'Restaurant', 'Our Chefs', 'Testimonials', 'Blogs', 'FAQ\'S', 'Privacy Policy']
        }
    ];

    // --- Methods ---
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

    public openSignupModal() {
        this.showSignupModal.set(true);
    }

    public scrollSlider(slider: HTMLElement, amount: number) {
        slider.scrollBy({ left: amount, behavior: 'smooth' });
    }

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
    }
}

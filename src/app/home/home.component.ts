import { Component, inject, computed } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LayoutService } from '../layout.service';
import { ProductService } from '../product.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    imports: [CommonModule, NgIf, RouterLink, HeaderComponent, FooterComponent, SidebarComponent]
})
export class HomeComponent {
    public readonly layout = inject(LayoutService);
    public readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    openProductDetail(id: number) {
        this.router.navigate(['/product', id]);
    }

    public exclusiveLimit = 4;
    public freshLimit = 4;
    public pantryLimit = 4;
    public snacksLimit = 4;
    public bakeryLimit = 4;
    public storeLimit = 4;
    public allLimit = 12;

    // --- Data (Local to Home) ---
    public readonly mainCuisines = [
        { name: 'Fast Food', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=200' },
        { name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=200' },
        { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200' },
        { name: 'Pakistani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=200' },
        { name: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=200' },
        { name: 'Halwa Puri', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=200' },
        { name: 'Paratha', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=200' }
    ];

    public readonly dailyDeals = [
        { title: 'World Cup deals', discount: 'Up to 30% off', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400' },
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

    // --- Computed (Local to Home) ---
    public readonly filteredHomeChefs = computed(() => {
        const filters = this.layout.quickFilters();
        const sortKey = this.layout.activeSort();
        const selectedCuisine = this.layout.selectedCuisine();

        const parseMinTime = (time: string) => {
            const match = time.match(/(\d+)(?:-(\d+))?/);
            if (!match) return Number.MAX_SAFE_INTEGER;
            return Number(match[1]);
        };

        const parsePrice = (priceLevel: string) => (priceLevel.match(/\$/g) || []).length;

        let list = [...this.homeChefs];

        if (selectedCuisine) {
            list = list.filter(chef => chef.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()));
        }

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

    public readonly partnerCards = [
        { title: 'List your restaurant or shop', description: 'Would you like millions of new customers to enjoy your amazing food and goods? So would we!', buttonText: 'Get started', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600' },
        { title: 'Become a rider', description: 'Enjoy flexibility, freedom and competitive earnings by delivering through foodpanda.', buttonText: 'Get started', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600' },
        { title: 'foodpanda for business', description: 'Order lunch or fuel for your team or book pandago for your business needs.', buttonText: 'Get started', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' }
    ];

    public readonly pandamartBanners = [
        { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200', title: 'Up to 35% off groceries' },
        { image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200', title: 'Freshness you can trust' }
    ];

    public readonly pandamartCategories = [
        { name: 'Offers', icon: 'fas fa-percentage', color: '#FFF1F2' },
        { name: 'Fresh Produce', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=200' },
        { name: 'Meat & Seafood', image: 'https://images.unsplash.com/photo-1607623278264-274be50843b0?auto=format&fit=crop&q=80&w=200' },
        { name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583726-296521703221?auto=format&fit=crop&q=80&w=200' },
        { name: 'Breakfast & Snacks', image: 'https://images.unsplash.com/photo-1550583726-222a76200021?auto=format&fit=crop&q=80&w=200' },
        { name: 'Beverages', image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=200' },
        { name: 'Cleaning Essentials', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200' }
    ];

    private readonly productService = inject(ProductService);

    public pandamartProducts = this.productService.exclusiveProducts;
    public freshProducts = this.productService.freshProducts;
    public pantryProducts = this.productService.pantryProducts;
    public snackProducts = this.productService.snackProducts;
    public bakeryProducts = this.productService.bakeryProducts;

    public get allPandamartProducts() {
        return this.productService.getAllProducts();
    }


    // Sliced getters for pagination
    public get exclusiveDeals() { return this.pandamartProducts.slice(0, this.exclusiveLimit); }
    public get freshDeals() { return this.freshProducts.slice(0, this.freshLimit); }
    public get pantryDeals() { return this.pantryProducts.slice(0, this.pantryLimit); }
    public get snackDeals() { return this.snackProducts.slice(0, this.snacksLimit); }
    public get bakeryDeals() { return this.bakeryProducts.slice(0, this.bakeryLimit); }
    public get allDeals() { return this.allPandamartProducts.slice(0, this.allLimit); }


    public readonly pandamartBrands = [
        { name: 'Unilever', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=200' },
        { name: 'Nestle', image: 'https://images.unsplash.com/photo-1550583726-296521703221?auto=format&fit=crop&q=80&w=200' },
        { name: 'P&G', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200' },
        { name: 'National', image: 'https://images.unsplash.com/photo-1510300643-8e6d234a9749?auto=format&fit=crop&q=80&w=200' }
    ];

    public scrollSlider(slider: HTMLElement, amount: number) {
        slider.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

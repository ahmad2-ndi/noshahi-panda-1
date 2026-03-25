import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  public shop = signal<any>(null);

  // Expanded mock data (should be in a service in a real app)
  private allShops = [
    // FOOD
    {
      id: 5, name: 'KFC', category: 'food', logo: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png', rating: 4.5, deliveryTime: '25-30 min',
      products: [
        { id: 5001, name: 'Zinger Burger', price: 590, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200', brand: 'KFC', weight: 'Spicy' },
        { id: 5002, name: 'Hot Wings', price: 450, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=200', brand: 'KFC', weight: '10 Pcs' },
        { id: 5003, name: 'Mighty Zinger', price: 750, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200', brand: 'KFC', weight: 'Double Patty' },
        { id: 5004, name: 'Krunch Burger', price: 350, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200', brand: 'KFC', weight: 'Mini' }
      ]
    },
    {
        id: 6, name: 'Savour Foods', category: 'food', logo: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=200', rating: 4.9, deliveryTime: '15-25 min',
        products: [
          { id: 6001, name: 'Chicken Pulao', price: 450, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=200', brand: 'Savour', weight: '1 Plate' },
          { id: 6003, name: 'Shami Kabab', price: 120, image: 'https://images.unsplash.com/photo-1514516322520-299289fa2cb2?q=80&w=200', brand: 'Savour', weight: '2 Pcs' },
          { id: 6002, name: 'Chicken Tikka', price: 350, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=200', brand: 'Savour', weight: '1 Leg' },
          { id: 6004, name: 'Extra Raita', price: 50, image: 'https://images.unsplash.com/photo-1589112258504-f58911225850?q=80&w=200', brand: 'Savour', weight: '1 Cup' }
        ]
      },
      {
        id: 7, name: 'Pizza Hut', category: 'food', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Pizza-Hut-Logo.png', rating: 4.3, deliveryTime: '30-40 min',
        products: [
          { id: 7001, name: 'Fajita Pizza', price: 1400, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200', brand: 'Pizza Hut', weight: 'Medium' },
          { id: 7002, name: 'Garlic Bread', price: 350, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=200', brand: 'Pizza Hut', weight: '4 Pcs' },
          { id: 7003, name: 'Chicken Supreme', price: 1600, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=200', brand: 'Pizza Hut', weight: 'Large' },
          { id: 7004, name: 'Potato Wedges', price: 400, image: 'https://images.unsplash.com/photo-1573014352303-a12f107cc563?q=80&w=200', brand: 'Pizza Hut', weight: 'Standard' }
        ]
      },
      {
        id: 8, name: 'Burger Lab', category: 'food', logo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200', rating: 4.6, deliveryTime: '20-35 min',
        products: [
          { id: 8001, name: 'Dope Burger', price: 650, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200', brand: 'Burger Lab', weight: 'Cheese' },
          { id: 8002, name: 'Quadra', price: 1200, image: 'https://images.unsplash.com/photo-1550547660-d9450f853867?q=80&w=200', brand: 'Burger Lab', weight: '4 Patties' },
          { id: 8003, name: 'Animal Fries', price: 550, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=200', brand: 'Burger Lab', weight: 'Large' },
          { id: 8004, name: 'Fire House', price: 850, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7dd33?q=80&w=200', brand: 'Burger Lab', weight: 'Spicy' }
        ]
      },
    // BEAUTY
    {
      id: 1, name: 'Allure Beauty', category: 'beauty', logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200', rating: 4.8, deliveryTime: '20-35 min',
      products: [
        { id: 10001, name: 'Lipstick Set', price: 1200, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=200', brand: 'Allure', weight: 'Set of 4' },
        { id: 10002, name: 'Face Cream', price: 850, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200', brand: 'Glow', weight: '50ml' },
        { id: 10003, name: 'Palette', price: 1500, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=200', brand: 'Allure', weight: '12 Colors' },
        { id: 10004, name: 'Face Oil', price: 950, image: 'https://images.unsplash.com/photo-1601055283742-ce346facc672?q=80&w=200', brand: 'Nature', weight: '30ml' }
      ]
    },
    {
        id: 3, name: 'Pink Fashion', category: 'beauty', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200', rating: 4.6, deliveryTime: '25-40 min',
        products: [
          { id: 30001, name: 'Perfume', price: 3500, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200', brand: 'Pink', weight: '100ml' },
          { id: 30002, name: 'Lip Gloss', price: 450, image: 'https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=200', brand: 'Pink', weight: '10ml' },
          { id: 30003, name: 'Mascara', price: 750, image: 'https://images.unsplash.com/photo-1591360236630-4ee913c44fcc?q=80&w=200', brand: 'Pink', weight: 'Black' },
          { id: 30004, name: 'Serum', price: 1100, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=200', brand: 'Nature', weight: '50ml' }
        ]
      },
      {
        id: 9, name: 'Glow Up', category: 'beauty', logo: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=200', rating: 4.7, deliveryTime: '15-25 min',
        products: [
          { id: 90001, name: 'Facial Wash', price: 600, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200', brand: 'Glow', weight: '100ml' },
          { id: 90002, name: 'Sunscreen', price: 1400, image: 'https://images.unsplash.com/photo-1556229167-737d82477810?q=80&w=200', brand: 'Glow', weight: '50g' },
          { id: 90003, name: 'Moisturizer', price: 900, image: 'https://images.unsplash.com/photo-1556228578-8c196fbb5543?q=80&w=200', brand: 'Glow', weight: '75ml' },
          { id: 90004, name: 'Cleanser', price: 800, image: 'https://images.unsplash.com/photo-1556228518-e8b8364ea111?q=80&w=200', brand: 'Glow', weight: '150ml' }
        ]
      },
      {
        id: 10, name: 'The Body Shop', category: 'beauty', logo: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=200', rating: 4.4, deliveryTime: '20-30 min',
        products: [
          { id: 100001, name: 'Body Butter', price: 2200, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=200', brand: 'TBS', weight: '200ml' },
          { id: 100002, name: 'Shower Gel', price: 1100, image: 'https://images.unsplash.com/photo-1556228833-f58911225850?q=80&w=200', brand: 'TBS', weight: '250ml' },
          { id: 100003, name: 'Tea Tree Oil', price: 1800, image: 'https://images.unsplash.com/photo-1601055283742-ce346facc672?q=80&w=200', brand: 'TBS', weight: '10ml' },
          { id: 100004, name: 'Hand Cream', price: 850, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=200', brand: 'TBS', weight: '30ml' }
        ]
      },
      // ELECTRONICS
      {
        id: 2, name: 'Mobile Zone', category: 'electronics', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200', rating: 4.9, deliveryTime: '30-45 min',
        products: [
          { id: 20001, name: 'Panda Phone', price: 45000, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=200', brand: 'Panda', weight: '256GB' },
          { id: 20002, name: 'Earbuds', price: 3200, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200', brand: 'Sonic', weight: 'White' },
          { id: 20003, name: 'Smart Watch', price: 6500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200', brand: 'Panda', weight: 'Black' },
          { id: 20004, name: 'Charger', price: 1800, image: 'https://images.unsplash.com/photo-1629813583561-9f9392e92c48?q=80&w=200', brand: 'Panda', weight: 'Type-C' }
        ]
      },
      {
        id: 11, name: 'Samsung Official', category: 'electronics', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png', rating: 4.8, deliveryTime: '20-40 min',
        products: [
          { id: 110001, name: 'Galaxy S24', price: 280000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=200', brand: 'Samsung', weight: '512GB' },
          { id: 110002, name: 'Buds Pro', price: 25000, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200', brand: 'Samsung', weight: 'Silver' },
          { id: 110003, name: 'Watch Ultra', price: 85000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200', brand: 'Samsung', weight: 'Titanium' },
          { id: 110004, name: 'Adapter 25W', price: 4500, image: 'https://images.unsplash.com/photo-1629813583561-9f9392e92c48?q=80&w=200', brand: 'Samsung', weight: 'Black' }
        ]
      },
      {
        id: 12, name: 'Apple Store', category: 'electronics', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png', rating: 4.9, deliveryTime: '25-45 min',
        products: [
          { id: 120001, name: 'iPhone 15 Pro', price: 350000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200', brand: 'Apple', weight: '256GB' },
          { id: 120002, name: 'AirPods Max', price: 145000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200', brand: 'Apple', weight: 'Space Gray' },
          { id: 120003, name: 'iPad Air', price: 185000, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200', brand: 'Apple', weight: '64GB' },
          { id: 120004, name: 'MagSafe Case', price: 15000, image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=200', brand: 'Apple', weight: 'Clear' }
        ]
      },
      {
        id: 4, name: 'Tech World', category: 'electronics', logo: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=200', rating: 4.7, deliveryTime: '30-50 min',
        products: [
          { id: 40001, name: 'Tablet Z10', price: 28000, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200', brand: 'Tech', weight: '128GB' },
          { id: 40002, name: 'Power Bank', price: 4500, image: 'https://images.unsplash.com/photo-1609091839697-ebc487fb0847?q=80&w=200', brand: 'Tech', weight: '20000mAh' },
          { id: 40003, name: 'BT Speaker', price: 5200, image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=200', brand: 'Boom', weight: 'Portable' },
          { id: 40004, name: 'USB Cable', price: 600, image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=200', brand: 'Tech', weight: '2m' }
        ]
      }
  ];


  ngOnInit() {
    this.route.params.subscribe(params => {
      const shopId = +params['id'];
      const foundShop = this.allShops.find(s => s.id === shopId);
      this.shop.set(foundShop);
    });
  }
}

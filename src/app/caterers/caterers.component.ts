import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-caterers',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './caterers.component.html',
  styleUrl: './caterers.component.css'
})
export class CaterersComponent {
  public activeCategory = signal('All Caterers');

  public caterers = [
    {
      id: 1, name: 'Royal Feasts Catering', rating: 4.9, minOrder: 50, price: 'Rs. 1500/head',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600',
      logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=100',
      tags: ['Weddings', 'Corporate'],
      category: 'Weddings & Large Events',
      description: 'Premium dining experience with highly skilled chefs catering to your royal taste.'
    },
    {
      id: 2, name: 'Noshahi Premium Events', rating: 4.8, minOrder: 20, price: 'Rs. 1200/head',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600',
      logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=100',
      tags: ['Corporate', 'Parties', 'Birthdays'],
      category: 'Corporate & Parties',
      description: 'Elegant setups and diverse menus perfectly tailored for your corporate meets.'
    },
    {
      id: 3, name: 'Desi Dastarkhwan', rating: 4.7, minOrder: 30, price: 'Rs. 800/head',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600',
      logo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=100',
      tags: ['Traditional', 'Weddings'],
      category: 'Traditional',
      description: 'Authentic Pakistani cuisine offering an unforgettable traditional dining experience.'
    },
    {
      id: 4, name: 'Sweet & Savory', rating: 4.6, minOrder: 10, price: 'Rs. 600/head',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f853867?q=80&w=600',
      logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=100',
      tags: ['Birthdays', 'Traditional'],
      category: 'Birthdays & Get-togethers',
      description: 'Perfect for small gatherings with live cooking stations and dessert bars.'
    },
    {
      id: 5, name: 'The Grand Kitchen', rating: 4.9, minOrder: 100, price: 'Rs. 2000/head',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600',
      logo: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=100',
      tags: ['Weddings', 'Corporate'],
      category: 'Luxury Banquets',
      description: 'Extravagant luxury catering specializing in high-profile VIP banquets.'
    },
    {
      id: 6, name: 'Spicy Delights', rating: 4.5, minOrder: 15, price: 'Rs. 750/head',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600',
      logo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=100',
      tags: ['Birthdays', 'Corporate', 'Parties'],
      category: 'Parties',
      description: 'Fun, fiery, and fantastic catering for a spicy and vibrant evening.'
    }
  ];

  public categories = [
    { name: 'All Caterers', icon: 'fas fa-th-list' },
    { name: 'Weddings', icon: 'fas fa-ring' },
    { name: 'Corporate', icon: 'fas fa-briefcase' },
    { name: 'Traditional', icon: 'fas fa-fire' },
    { name: 'Birthdays', icon: 'fas fa-birthday-cake' }
  ];

  public filteredCaterers = computed(() => {
    const active = this.activeCategory();
    if (active === 'All Caterers') return this.caterers;
    return this.caterers.filter(c => c.tags.includes(active));
  });

  public setCategory(name: string) {
    this.activeCategory.set(name);
  }
}

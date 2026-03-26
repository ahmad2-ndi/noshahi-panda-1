import { Injectable, signal } from '@angular/core';

export type OrderStatus = 'processing' | 'packed' | 'in-transit' | 'delivered';

export interface Order {
  id: string;
  items: any[];
  address: any;
  paymentMethod: string;
  total: number;
  status: OrderStatus;
  location: string;
  eta: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public readonly orders = signal<Order[]>([]);

  public placeOrder(items: any[], address: any, paymentMethod: string, total: number): string {
    const trackingId = 'NP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newOrder: Order = {
      id: trackingId,
      items: [...items],
      address: { ...address },
      paymentMethod,
      total,
      status: 'processing',
      location: 'Noshahi Panda Kitchen',
      eta: '35-45 mins',
      timestamp: Date.now()
    };

    this.orders.update(prev => [newOrder, ...prev]);
    return trackingId;
  }

  public getOrder(trackingId: string): Order | undefined {
    return this.orders().find(o => o.id === trackingId);
  }

  // Helper for demo: simulate progress
  public getDemoStatus(order: Order): Order {
    const elapsed = Date.now() - order.timestamp;
    let status: OrderStatus = 'processing';
    let location = 'Kitchen';
    let eta = '35 mins';

    if (elapsed > 60000) { // 1 min
      status = 'packed';
      location = 'Packing Station';
      eta = '25 mins';
    }
    if (elapsed > 120000) { // 2 mins
      status = 'in-transit';
      location = 'Near Barkat Market';
      eta = '12 mins';
    }
    if (elapsed > 300000) { // 5 mins
      status = 'delivered';
      location = 'Your Doorstep';
      eta = 'Delivered';
    }

    return { ...order, status, location, eta };
  }
}

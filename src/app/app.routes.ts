import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PandamartOffersComponent } from './pandamart-offers/pandamart-offers.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { CaterersComponent } from './caterers/caterers.component';

import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { RiderDashboardComponent } from './rider-dashboard/rider-dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pandamart-offers', component: PandamartOffersComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'shops', component: ShopsComponent },
    { path: 'shop/:id', component: ShopDetailComponent },
    { path: 'caterers', component: CaterersComponent },
    { path: 'order-success', component: OrderSuccessComponent },
    { path: 'track-order', component: OrderTrackingComponent },
    { path: 'seller-dashboard', component: SellerDashboardComponent },
    { path: 'rider-dashboard', component: RiderDashboardComponent },
    { path: '**', redirectTo: '' }
];

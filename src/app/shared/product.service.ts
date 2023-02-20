import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar.service';
import { Product } from 'src/app/shared/product';
import { Cart } from 'src/app/shared/cart';
import { Orders } from 'src/app/shared/orders';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  proRef!: AngularFireObject<any>;

  constructor(
    public nav: NavbarService,
    private fs: Firestore,
    private router: Router,
    private db: AngularFireDatabase,
    private ds: AngularFirestore
  ) {}

  ngOnInit() {
    this.nav.show();
  }

  addProduct(product: Product) {
    product.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'product'), product);
  }

  getProduct(): Observable<Product[]> {
    let productRef = collection(this.fs, 'product');
    return collectionData(productRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  deleteProduct(product: Product) {
    let docRef = doc(this.fs, `product/${product.id}`);
    return deleteDoc(docRef);
  }

  GetProductById(id: any) {
    this.proRef = this.db.object('product/' + id);
    return this.proRef;
  }

  updateProduct(id: any, products: any) {
    let docRef = doc(this.fs, `product/${id}`);
    return updateDoc(docRef, products);
  }

  getProductSearch(title: string) {
    return new Promise<any>((resolve) => {
      this.ds
        .collection('product', (ref) => ref.where('title', '==', title))
        .valueChanges()
        .subscribe((title) => resolve(title));
    });
  }
  getCategorySearch(category: string) {
    return new Promise<any>((resolve) => {
      this.ds
        .collection('product', (ref) => ref.where('category', '==', category))
        .valueChanges()
        .subscribe((category) => resolve(category));
    });
  }
  addToCart(cart: Cart) {
    cart.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'cart'), cart);
  }
  getCart(): Observable<Cart[]> {
    let cartRef = collection(this.fs, 'cart');
    return collectionData(cartRef, { idField: 'id' }) as Observable<Cart[]>;
  }
  deleteFromCart(cart: Cart) {
    let docRef = doc(this.fs, `cart/${cart.id}`);
    return deleteDoc(docRef);
  }
  updateCount(id: string, j: number) {
    let docRef = doc(this.fs, `cart/${id}`);
    let updateData = {
      count: j,
    };
    return updateDoc(docRef, updateData);
  }
  addOrder(orders: Orders) {
    orders.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'orders'), orders);
  }

  getOrder(): Observable<Orders[]> {
    let orderRef = collection(this.fs, 'orders');
    return collectionData(orderRef, { idField: 'id' }) as Observable<Orders[]>;
  }
}

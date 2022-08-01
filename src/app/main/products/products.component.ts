import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$?: Observable<Product[]>

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.products$ = this.mainService.getProducts()
  }

}

import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { IProduct, ProductCategoriesType } from './model/product.model';
import { InputText } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    imports: [
        Button,
        Carousel,
        Tag,
        CommonModule,
        InputText,
        Toolbar
    ],
    templateUrl: './products.component.html',
    standalone: true,
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
    products: IProduct[] = [];
    productsTVCategory: WritableSignal<IProduct[]> = signal([]);
    productsAudioCategory: WritableSignal<IProduct[]> = signal([]);
    productsLaptopCategory: WritableSignal<IProduct[]> = signal([]);
    productsMobileCategory: WritableSignal<IProduct[]> = signal([]);
    productsGamingCategory: WritableSignal<IProduct[]> = signal([]);
    productsAppliancesCategory: WritableSignal<IProduct[]> = signal([]);


    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(
        private readonly productService: ProductsService,
    ) {
    }

    ngOnInit() {
        this.initialize();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'success';
        }
    }

    initialize() {
        this.productService.getProducts()
            .subscribe((res: any) => {
                this.products = res.products;

                this.productsTVCategory.set(res.products.filter((item: IProduct) => item.category === ProductCategoriesType.TV))
                this.productsAudioCategory.set(res.products.filter((item: IProduct) => item.category === ProductCategoriesType.Audio))
                this.productsMobileCategory.set(res.products.filter((item: IProduct) => item.category === ProductCategoriesType.MOBILE))
                this.productsGamingCategory.set(res.products.filter((item: IProduct) => item.category === ProductCategoriesType.GAMING))
                this.productsLaptopCategory.set(res.products.filter((item: IProduct) => item.category === ProductCategoriesType.LAPTOP))
                this.productsAppliancesCategory.set(res.products.filter((item: IProduct) => item.category === ProductCategoriesType.APPLIANCES))
            })
    }
}

export interface IProduct {
    id?: number,
    title: string,
    image: string,
    price: number,
    description?: string,
    brand: string,
    model: string,
    color?: string,
    category: string,
    discount?: number
}

export enum ProductCategoriesType {
    Audio = 'audio',
    TV = 'TV',
    LAPTOP = 'laptop',
    MOBILE = 'mobile',
    GAMING = 'gaming',
    APPLIANCES = 'appliances',
}

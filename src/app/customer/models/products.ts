export interface Products {
    productId:          number;
    title:              string;
    description:        string;
    categoryId:         number;
    price:              number;
    discountPercentage: number;
    stock:              number;
    tags:               string[];
    availabilityStatus: string;
    thumbnail:          string;
}

export interface PaginatorProducts {
    data: Products[];
}


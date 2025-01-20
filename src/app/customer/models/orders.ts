export interface Orders {
    orderId:        number;
    userId:         number;
    products:       [productId: number, quantity: number];
    status?:        string;
    total?:         number;
    paymentType?:   string;
    paymentStatus?: string;
}

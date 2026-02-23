import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderItem {
    itemId: string;
    quantity: bigint;
    price: Price;
}
export interface Service {
    id: string;
    title: string;
    sourceUrl: string;
    price: Price;
    rawPayload: string;
}
export interface Order {
    total: Price;
    clientId: string;
    items: Array<OrderItem>;
}
export interface Product {
    id: string;
    title: string;
    sourceUrl: string;
    price: Price;
    rawPayload: string;
}
export interface Price {
    currency: string;
    amount: number;
}
export interface backendInterface {
    createOrder(order: Order): Promise<string>;
    deleteOrder(id: string): Promise<void>;
    echoText(text: string): Promise<string>;
    generateClientId(mobile10: string, unixTimestamp: string): Promise<string>;
    getAllProducts(): Promise<Array<Product>>;
    getAllServices(): Promise<Array<Service>>;
    getArbitrages(): Promise<Array<[string, Price, string, Price]>>;
    getContactInfo(): Promise<[string, string]>;
    getOrder(id: string): Promise<Order>;
    getOrdersByClient(clientId: string): Promise<Array<Order>>;
    getProductsByCurrency(currency: string): Promise<Array<Product>>;
    getProductsByMinPrice(minPrice: number): Promise<Array<Product>>;
    getProductsBySource(sourceUrl: string): Promise<Array<Product>>;
    getProductsSortedByPrice(): Promise<Array<Product>>;
    getSitemap(): Promise<Array<[string, bigint, string]>>;
    setArbitrage(_sourcePlatform: string, _arbitrage1: [string, Price, string, Price], _arbitrage2: [string, Price, string, Price]): Promise<bigint>;
    updateOrder(id: string, updatedOrder: Order): Promise<void>;
}

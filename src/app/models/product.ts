export class Product {
    id: number;
    title: string;
    price: number;
    description: string;
    
    constructor(id: number, title: string, price: number, description: string) {
        this.id = id;
        this.title = title;
        this.price = Number(price);
        this.description = description;
    }

    get isPricey(): boolean {
        return this.price > 100;
    }
};

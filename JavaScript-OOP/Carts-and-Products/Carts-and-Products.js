function solve() {
    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }

        get productType() {
            return this._productType;
        }

        set productType(productType) {
            this._productType = productType
        }

        get name() {
            return this._name;
        }

        set name(name) {
            this._name = name
        }

        get price() {
            return this._price;
        }

        set price(price) {
            this._price = price
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = []
        }

        add(product) {
            this.products.push(product);
            return this;
        }

        remove(product) {

            let result = this.products.findIndex(c=>Object.keys(product).every(p=>product[p] === c[p]));
            this.products.splice(result, 1);
            if (result < 0) {
                throw 'There is no such product in the shopping card!';
            }
            return result;
        }

        showCost() {


            let result = this.products.reduce((cost, product)=>cost + product.price, 0);
            return result;
        }

        showProductTypes() {
            let result = this.products.sort((a, b)=>a.productType.localeCompare(b.productType));
            let finalResult = result.map(p=>p.productType).filter((p, i, ps)=>p !== ps[i - 1]);
            return finalResult;
        }

        getInfo() {
            let totalPrice = this.products.reduce((cost, product)=>cost + product.price, 0);
            let productsInfo = {};
            for (let p of this.products) {
                //console.log(p.name)
                if (!productsInfo[p.name]) {
                    productsInfo[p.name] = {
                        name: p.name,
                        totalPrice: 0,
                        quantity: 0
                    };
                }
                productsInfo[p.name].totalPrice += p.price;
                productsInfo[p.name].quantity += 1;

            }
            let products = Object.keys(productsInfo).map(g => productsInfo[g]);
           // console.log(result);
            return {
                totalPrice,
                products
            };
        }

    }
    return {
        Product, ShoppingCart
    };
}

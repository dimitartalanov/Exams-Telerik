function solve() {
    let type = [];

    function getProduct(productType, name, price) {
        this._productType = productType;
        this._name = name;
        this._price = price;
        //console.log(this._productType,_name,this._price);
        type.push(this._productType);
        //console.log(type);
        return {productType: this._productType, name: this._name, price: this._price}
    }

    function getShoppingCart() {
        /* products: Array
         add: Function
         remove: Function
         showCost: Function
         showProductTypes: Function
         getInfo: Function
         */
        let products = [];

        function add() {
//;//console.log(arguments[0]);
            // function(){return
            products.push(arguments[0]);
            products.map(function (x) {
                return {
                    productType: x.productType, name: x.name, price: x.price
                }
            }).slice();

            return this;
        }

        function remove() {
            if (products.length === 0) {
                throw 'product is empry'
            }
            if (!products.includes(arguments[0])) {
                throw 'There is no such product in the shopping card!';
            }
            //console.log(arguments[0]);
            // products.filter(function(el) {//console.log(el,arguments[0]);
            //     return el.name !== arguments[0].name;
            // });
            // console.log(products);
            for (let i = 0, len = products.length; i < len; i += 1) {
                let currProduct = products[i];

                if (arguments[0].productType === currProduct.productType &&
                    arguments[0].name === currProduct.name &&
                    arguments[0].price === currProduct.price) {
                    products.splice(i, 1);
                    break;
                }
            }

            // console.log(products);
            return this;
        }

        function showCost() {
            if (products.length === 0) {
                return 0
            }
            let price = 0;
            for (n in products) {
                price += products[n].price;
            }

            return price;
        }

        function showProductTypes() {
            let productType = [];
            if (products.length === 0) {
                return []
            }

            for (p in products) {
                if (!productType.includes(products[p])) {
                    //uniqueType();
                    //console.log(products[p]);
                    productType.push(products[p].productType);//type[p]
                }
            }
            //console.log(productType);
            return productType.sort();
        }

        function getInfo() {
        

            let productInfo = {};

            for(const product of products) {

                if (!productInfo[product.name]) {
                    productInfo[product.name] = {
                        name: product.name,
                        totalPrice: 0,
                        quantity: 0
                    };
                }

                productInfo[product.name].totalPrice += product.price;
                productInfo[product.name].quantity += 1;
            }

            let totalPrice = showCost(),
                allProducts = Object.keys(productInfo).map(groupName => productInfo[groupName]);
            //let totalPrice = allProducts.reduce((total, current) => total + current.totalPrice, 0);
            return {
                totalPrice: totalPrice,
                products: allProducts
            };
        }

        return {
            add, remove, showCost, showProductTypes, getInfo,
            products// products.map(function(x){
            //return  {productType:x.productType,name:x.name,price:x.price
            //}}).slice()
        }
    }

    return {
        getProduct: getProduct,
        getShoppingCart: getShoppingCart
    };
}

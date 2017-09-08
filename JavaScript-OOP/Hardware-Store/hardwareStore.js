function solve() {
    // Your classes
    const getId = (function () {
        let id = 0;
        return function () {
            id += 1;
            return id;
        }
    }());
    class Product {
        constructor(manufacturer, model, price) {
            this.id = getId();
            this.manufacturer = manufacturer;
            this.model = model;
            this.price = price;
        }

        get manufacturer() {
            return this._manufacturer;
        }

        set manufacturer(manufacturer) {
            //string with length between 1 and 20 symbols (inclusive)
            if (manufacturer.length <=0 || manufacturer.length > 20 || typeof manufacturer !== 'string') {
                throw Error('manufacturer string with length between 1 and 20 symbols (inclusive)')
            }
            this._manufacturer = manufacturer;
        }

        get model() {
            return this._model;
        }

        set model(model) {
            //string with length between 1 and 20 symbols (inclusive)
            if (model.length <= 0 || model.length > 20 || typeof model !== 'string') {
                throw Error('model string with length between 1 and 20 symbols (inclusive)')
            }
            this._model = model;
        }

        get price() {
            return this._price;
        }

        set price(price) {
            //positive, non-zero number
            if (price < 1 || typeof price !== 'number' || Number.isNaN(price)) {
                throw Error('price positive, non-zero number')
            }
            this._price = price;
        }

        getLabel() {
            return ' - '+this._manufacturer+' '+this._model+ ' - **'+this._price+'**'
        }
    }
    class SmartPhone extends Product {
        constructor(manufacturer, model, price, screenSize, operatingSystem) {
            super(manufacturer, model, price)
            this.screenSize = screenSize;
            this.operatingSystem = operatingSystem;
        }

        get screenSize() {
            return this._screenSize;
        }

        set screenSize(screenSize) {
            //positive, non-zero number
            if (screenSize <= 0 || typeof screenSize !== 'number' || Number.isNaN(screenSize)) {
                throw Error('screenSize positive, non-zero number')
            }
            this._screenSize = screenSize;
        }

        get operatingSystem() {
            return this._operatingSystem;
        }

        set operatingSystem(operatingSystem) {
            //string with length between 1 and 10 symbols (inclusive)
            if (operatingSystem.length < 1 || operatingSystem.length > 10 || typeof operatingSystem !== 'string') {
                throw Error('operatingSystem string with length between 1 and 10 symbols (inclusive)')
            }
            this._operatingSystem = operatingSystem;
        }


        getLabel() {
            let message = super.getLabel();
            return 'SmartPhone' + message;
        }
    }
    class Charger extends Product {
        constructor(manufacturer, model, price, outputVoltage, outputCurrent) {
            super(manufacturer, model, price)
            this.outputVoltage = outputVoltage;
            this.outputCurrent = outputCurrent;
        }

        get outputVoltage() {
            return this._outputVoltage;
        }

        set outputVoltage(outputVoltage) {
            // number between 5 and 20 (inclusive)
            if (outputVoltage <= 0 || outputVoltage > 20 || typeof outputVoltage !== 'number' || Number.isNaN(outputVoltage)) {
                throw Error('outputVoltage positive, non-zero number')
            }
            this._outputVoltage = outputVoltage;
        }

        get outputCurrent() {
            return this._outputCurrent;
        }

        set outputCurrent(outputCurrent) {
            //number between 100 and 3000 (inclusive)
            if (outputCurrent < 100 || outputCurrent > 3000 || typeof outputCurrent !== 'number' || Number.isNaN(outputCurrent)) {
                throw Error('outputCurrent positive, non-zero number')
            }
            this._outputCurrent = outputCurrent;
        }

        getLabel() {
            let message = super.getLabel();
            return 'Charger' + message;
        }
    }
    class Router extends Product {
        constructor(manufacturer, model, price, wifiRange, lanPorts) {
            super(manufacturer, model, price);
            this.wifiRange = wifiRange;
            this.lanPorts = lanPorts;
        }

        get wifiRange() {
            return this._wifiRange;
        }

        set wifiRange(wifiRange) {
            if (wifiRange <= 0 || typeof wifiRange !== 'number' || Number.isNaN(wifiRange)) {
                throw Error('wifiRange positive, non-zero number')
            }
            //positive, non-zero number

            this._wifiRange = wifiRange;
        }

        get lanPorts() {
            return this._lanPorts;
        }

        set lanPorts(lanPorts) {
            //positive, non-zero integer number
            if (lanPorts <= 0 || typeof lanPorts !== 'number' || Number.isNaN(lanPorts) || ((lanPorts | 0) !== lanPorts )) {
                throw Error('lanPorts positive, non-zero integer number')
            }
            this._lanPorts = lanPorts;
        }

        getLabel() {
            let message = super.getLabel();
            return 'Router' + message;
        }
    }
    class Headphones extends Product {
        constructor(manufacturer, model, price, quality, hasMicrophone) {
            super(manufacturer, model, price)
            this.quality = quality;
            this.hasMicrophone = hasMicrophone;
        }

        get quality() {
            return this._quality;
        }

        set quality(quality) {
            //high, mid or low
            if (quality !== 'high' && quality !== 'mid' && quality !== 'low') {
                throw Error('quality high, mid or low')
            }
            this._quality = quality;
        }

        get hasMicrophone() {
            return this._hasMicrophone;
        }

        set hasMicrophone(x) {
            if (x) {
                this._hasMicrophone = true;
            } else {
                this._hasMicrophone = false;
            }
        }

        getLabel() {
            let message = super.getLabel();
            return 'Headphones' + message;
        }
    }
let curentSum=0;
    class HardwareStore {
        constructor(name) {
            this.name = name;
            this.products = [];
            //this.quantity=0;
        }

        get name() {
            return this._name;
        }

        set name(name) {
            //string with length between 1 and 20 symbols (inclusive)
            if (name.length <= 0 || name.length > 20 || typeof name !== 'string') {
                throw Error('name string with length between 1 and 20 symbols (inclusive)')
            }
            this._name = name;
        }

        stock(product, quantity) {
            //product should be a valid Product instance
            if (!(product instanceof Product)) {
                throw Error('product instanceof Product')
            }
            //quantity should be a positive, non-zero integer number
            if (quantity <= 0 || typeof quantity !== 'number' || Number.isNaN(quantity)) {
               // throw Error('quantity positive, non-zero number')
            }
         // for(let i =0;i<quantity;i+=1) {
         //     this.products.push(product)
         // }
          let resProduct = {product: 0, quantity: 0};
          resProduct.product = product;
          resProduct.quantity = quantity;

            this.products.push(resProduct);
            // console.log(this.products)
            return this;
        }

        sell(productId, quantity) {
//quantity should be a positive, non-zero integer number
            if (quantity <= 0 || typeof quantity !== 'number' || Number.isNaN(quantity)) {
                throw Error('quantity positive, non-zero number')
            }
            //there should be at least quantity products with id productId available in the store

            let index = this.products.filter(c=>c.product.id === productId);
            //console.log('index ',index[0].quantity)
            if (index[0].quantity<quantity) {
                throw Error('there should be at least quantity products with id productId available in the store')
            }

            let indexQuantity= this.products.findIndex(c=>c.product.id===productId);

            this.products[indexQuantity].quantity-=quantity;
            if(this.products[indexQuantity].quantity===0){
                this.products.splice(indexQuantity,1)
            }
           // console.log(this.products)
            curentSum+=quantity*index[0].product.price;



            return this;
        }

        getSold() {
//returns the amount of money earned from selling in the current store

            return curentSum
        }

        search(pattern) {
           // pattern=pattern.toLowerCase();
            if (typeof pattern === 'string') {

                let result = this.products.filter(c=>c.product.manufacturer.toLowerCase().includes(pattern.toLowerCase()))
                let finalResult = [];
                if (result.length > 0) {
                    finalResult.push(result)
                }
                let result2 = this.products.filter(c=>c.product.model.toLowerCase().includes(pattern.toLocaleLowerCase()))
                if (result2.length > 0) {
                    finalResult.push(result2)
                }
                return finalResult[0]
            } else {

              // let maxPrice=pattern.maxPrice;
              // let minPrice=pattern.minPrice;
              // let curPrice;
              // if(pattern.hasOwnProperty('minPrice')) {
              //     let rangePrice = this.products.filter(c=>c.product.price >= pattern.minPrice)
              //     curPrice = this.products.forEach(c=>c.price = pattern.minPrice);
              // }
              // if(pattern.hasOwnProperty('maxPrice')) {
              //     let rangePrice = this.products.filter(c=>c.product.price <= pattern.maxPrice)
              //     curPrice = this.products.forEach(c=>c.price = pattern.maxPrice);
              // }
              // let result= this.products.filter(c=>Object.keys(c).some(p=>c[p].toString().includes(pattern)))

                let result = this.products.slice();

               if (pattern.hasOwnProperty('manufacturerPattern')) {

                   result = result.filter(x => x.product.manufacturer === pattern.manufacturerPattern);
               }
               if (pattern.hasOwnProperty('modelPattern')) {

                   result = result.filter(x => x.product.product.model === pattern.modelPattern);
               }
               if (pattern.hasOwnProperty('type')) {

                   result = result.filter(x => x.product.constructor.name === pattern.type);
               }
               if (pattern.hasOwnProperty('minPrice')) {

                   result = result.filter(x => x.product.price >= pattern.minPrice);
               }
               if (pattern.hasOwnProperty('maxPrice')) {

                   result = result.filter(x => x.product.price <= pattern.maxPrice);
               }


                return result
            }
        }

    }

    return {
        getSmartPhone(manufacturer, model, price, screenSize, operatingSystem) {
            return new SmartPhone(manufacturer, model, price, screenSize, operatingSystem)
        },
        getCharger(manufacturer, model, price, outputVoltage, outputCurrent) {
            return new Charger(manufacturer, model, price, outputVoltage, outputCurrent)
        },
        getRouter(manufacturer, model, price, wifiRange, lanPorts) {
            return new Router(manufacturer, model, price, wifiRange, lanPorts)
        },
        getHeadphones(manufacturer, model, price, quality, hasMicrophone) {
            return new Headphones(manufacturer, model, price, quality, hasMicrophone)
        },
        getHardwareStore(name) {
            return new HardwareStore(name)
        }
    };
}

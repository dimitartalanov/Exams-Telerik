/**
 * Created by dimitar on 2/28/2017.
 */
function solve() {
    // Your classes
    function copyApp(x){
        return {
            name: x.name,
            description: x.description,
            version: x.version,
            rating: x.rating,
            apps: x.apps // this is for stores
        };
    }
    class App {
        constructor(name, description, version, rating) {
            this.name = name;
            this.description = description;
            this.version = version;
            this.rating = rating;

        }

        get name() {
            return this._name;
        }

        set name(name) {
            if (name.length < 1 || name.length > 24 || name.match(/[^a-zA-Z0-9 ]/)) {
                throw Error('')
            }
            this._name = name;
        }

        get description() {
            return this._description;
        }

        set description(description) {
            if (typeof description !== 'string') {
                throw Error('')
            }
            this._description = description;
        }

        get version() {
            return this._version;
        }

        set version(version) {
            if (typeof version !== 'number' || version < 0) {
                throw Error('')
            }
            this._version = version;
        }

        get rating() {
            return this._rating;
        }

        set rating(rating) {
            if (typeof rating !== 'number' || rating < 0 || rating > 10) {
                throw Error('')
            }
            this._rating = rating;
        }

        release(version) {

            if (typeof version === 'number') {
                if (version < 0) {
                    throw Error('')
                }
                version = {version: version}
            }

            if (version.version === undefined || this.version >= version.version) {
                throw Error('')
            }
            this.version = version.version;
            if (version.hasOwnProperty('description')) {
                this.description = version.description
            }
            if (version.hasOwnProperty('rating')) {
                this.rating = version.rating
            }

            return this;
        }

    }

    class Store extends App {
        constructor(...params) {
            super(...params);
            this.apps = [];
        }

        release(version) {
            return super.release(version);
        }


        uploadApp(app) {
            if (!(app instanceof (App))) {
                throw Error('')
            }
            let index = this.apps.findIndex(c=>c.name === app.name);
            if (index < 0) {
                this.apps.push(app)
            } else {
                this.apps[index].description = app.description;
                this.apps[index].rating = app.rating;

            }
            return this;
        }

        takedownApp(name) {
            let index = this.apps.findIndex(c=>c.name === name);
            if (index < 0) {
                throw Error('')
            } else {

                this.apps.splice(index, 1);
            }

            return this;
        }

        search(pattern) {
           let result=this.apps.filter(n=>n.name.toString().toLowerCase().includes(pattern.toLowerCase())).sort(c=>c.name);
            //let result = this.apps.filter(c=>Object.keys(c).some(n=>c.name.toString().toLowerCase().includes(pattern.toLowerCase()))).sort((a, b)=>a.name.localeCompare(b.name));

            return result;
        }

        listMostRecentApps(count) {
//descending
            count = count || 10;
            let result = this.apps.reverse();
            return result.slice(0, count);

        }

        listMostPopularApps(count) {

            count = count || 10;
//if rating descending=== - upload time
            let result = this.apps.reverse().sort((a, b)=>b.rating - a.rating).slice(0, count);
            return result

        }

    }

    // let apps=[];
    class Device {
        constructor(hostname, apps) {
            this.hostname = hostname;
           //if (!apps.every(x=>x instanceof (App))) {
           //    throw Error('')
           //}
            this.apps = apps//.map(x => copyApp(x));// - an array of installed appstuka za da e taka da ne se polzwa gornata proverka w setura na apps a gornata

            this.installedApps = apps.filter(x => x instanceof Store).map(x => copyApp(x));;
           // console.log(this.installedApps[0].apps)
        }

        get hostname() {
            return this._hostname;
        }

        set hostname(hostname) {//or in constructor
            // hostname: a string with length between 1 and 32 symbols
            if (typeof hostname !== 'string' || hostname.length < 1 || hostname.length > 32) {
                throw Error('')
            }
            this._hostname = hostname;
        }

        get apps() {
            return this._apps;
        }

        set apps(apps) {
            if (!Array.isArray(apps)) {
                throw Error('')
            }
           if (!apps.every(x=>x instanceof (App))) {
               throw Error('')
           }
            // apps.forEach(function(a){
            //     try{
            //         let testApp = new App(a.name, a.description, a.version, a.rating);
            //     } catch(error){
            //         error.message = 'Element must be a valid instance of App!';
            //         throw error;
            //     }
            // });
            this._apps = apps;

        }

        search(pattern) {
          pattern = pattern.toLowerCase();

          const result = {};
            this.installedApps.forEach(store => {
              store.apps.forEach(x => {
                  if(x.name.toLowerCase().indexOf(pattern) < 0) {
                      return;
                  }
                  if(result.hasOwnProperty(x.name) && x.version <= result[x.name].version) {
                      return;
                  }
                  result[x.name] = x;
              });
          });

          // bgcoder does not support Object.values @ the moment (Thu Feb 23 15:35:42 EET 2017)
          //  console.log(Object.keys(result).sort().map(key => result[key]))
           // console.log(result.app)
          return Object.keys(result).sort().map(key => result[key]);
        }


        install(name) {
            let bestApp = {version: -1};
            this.installedApps.forEach(store => {
                const currApp = store.apps.find(x => x.name === name);
                if(currApp && bestApp.version < currApp.version) {
                    bestApp = currApp;
                }
            });

            if(bestApp.version < 0) {
                throw Error('Error app not found');
            }

            if(this.apps.every(x => x.name !== name)) {
                this.apps.push(copyApp(bestApp));
                if(bestApp instanceof Store) {
                    this.installedApps.push(copyApp(bestApp));
                }
            }

            return this;
        }

        uninstall(name) {
            let index = this.apps.findIndex(x => x.name === name);
            if(index < 0) {
                throw Error('App is not installed');
            }
            this.apps.splice(index, 1);

            index = this.installedApps.findIndex(x => x.name === name);
            if(index >= 0) {
                this.installedApps.splice(index, 1);
            }


            return this;
        }

        listInstalled() {
            return (this.apps.slice()
                .sort((x, y) => x.name.localeCompare(y.name)));
        }

        update() {
            this.apps = this.apps.map(app => {
                const name = app.name;

                let bestApp = app;
                this.installedApps.forEach(store => {
                    const currApp = store.apps.find(x => x.name === name);
                    if(currApp && bestApp.version < currApp.version) {
                        bestApp = currApp;
                    }
                });

                return bestApp;
            });


            return this;
        }
    }


    return {
        createApp(name, description, version, rating) {
            return new App(name, description, version, rating);
        },
        createStore(name, description, version, rating) {
            return new Store(name, description, version, rating)
        },
        createDevice(hostname, apps) {
            return new Device(hostname, apps)
        }
    }

}

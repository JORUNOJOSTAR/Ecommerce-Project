import './bootstrap';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import collapse from '@alpinejs/collapse';

Alpine.plugin(persist);
Alpine.plugin(collapse)

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {

    Alpine.store("header", {
        cartItemsObject: Alpine.$persist({}),
        watchingItems: Alpine.$persist([]),
        get watchListItems() {
            return this.watchingItems.length;
        },
        get cartItems() {
            return Object.values(this.cartItemsObject).reduce((accum, next) => accum + parseInt(next.quantity), 0);
        }
    })

    Alpine.data("toast", () => ({
        visible: false,
        delay: 5000,
        percent: 0,
        timeout: null,
        interval: null,
        message: null,
        close() {
            this.visible = false;
            clearInterval(this.interval);
        },
        show(message) {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }

            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.message = message;
            this.visible = true;
            this.timeout = setTimeout(() => {
                this.visible = false;
                this.timeout = null;
            }, this.delay)
            const startDate = Date.now();
            const futureDate = Date.now() + this.delay;
            this.interval = setInterval(() => {
                const date = Date.now();
                this.percent = (date - startDate) * 100 / (futureDate - startDate);
                if (this.percent >= 100) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            }, 30);
        }
    })
    );

    Alpine.data('productItem', (product) => {
        return {
            id: product.id,
            product,
            quantity: 1,
            addToWatchList() { 
                if (this.isInWatchList()) {
                    this.removeFromWatchList();
                    this.$dispatch('notify', {
                        message: "The item was removed from your watchlist"
                    })
                } else {
                    Alpine.store('header').watchingItems.push(this.product);
                    this.$dispatch('notify', {
                        message: 'The item was added into your watchlist'
                    })
                }
            },
            removeFromWatchList(){
                Alpine.store('header').watchingItems.splice(
                    Alpine.store('header').watchingItems.findIndex((p)=>p.id===this.id), 1
                );
            },
            isInWatchList() {
                return !!Alpine.store('header').watchingItems.find((p)=>p.id===this.id);
            },
            addToCart(quantity = 1) {
                Alpine.store('header').cartItemsObject[this.id] = Alpine.store('header').cartItemsObject[this.id] || { ...product, quantity: 0 };
                const currentAmount = parseInt(Alpine.store('header').cartItemsObject[this.id].quantity)
                Alpine.store('header').cartItemsObject[this.id].quantity = parseInt(currentAmount) + parseInt(quantity);
                this.$dispatch('notify', {
                    message: 'The item was added into the cart'
                })
            },
            removeItemFromCart() {
                delete Alpine.store('header').cartItemsObject[this.id];
                this.$dispatch('notify', {
                    message: 'The item was removed from cart'
                })
            }
        }
    });

})

Alpine.start();
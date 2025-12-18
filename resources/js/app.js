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

    Alpine.data('singupForm',()=>({
        errorClasses: 'border-red-500 ring-1 ring-red-600 focus:ring-red-600',
        defaultClasses: 'focus:border-purple-600 focus:ring-purple-600',
        successClasses: 'border-emerald-500 ring-1 ring-emerald-600 focus:ring-emerald-600',
        form: {
          name: '',
          email: '',
          password: '',
          password_repeat: '',
        },
        errors:{
          name: '',
          email: '',
          password: '',
          password_repeat: '',
        },
        submit(){
          console.log(this.form);
          this.validateName();
          this.validateEmail();
          this.validatePassword();
          this.validatePasswordRepeat();
        },
        validateName(){
          this.errors.name = '';
          if(!this.form.name){
            this.errors.name = 'This field is required';
          } else if(this.form.name.length < 2){
            this.errors.name = 'This name should be at least two character';
          }
        },
        validateEmail(){
          this.errors.email = '';
          if(!this.form.email){
            this.errors.email = 'This field is required';
          } else if(!this.validateEmailWithRegex()){
            this.errors.email = 'This must be a valid email field';
          }
        },
        validateEmailWithRegex(){
          return String(this.form.email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        validatePassword(){
          this.errors.password = '';
          if(!this.form.password){
            this.errors.password = 'This field is required';
          }
        },
        validatePasswordRepeat(){
          this.errors.password_repeat = '';
          if(!this.form.password_repeat){
            this.errors.password_repeat = 'This field is required';
          }
        },
    }))

})

Alpine.start();
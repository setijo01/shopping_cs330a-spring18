'use strict;'

class Subject {
    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}

class Item extends Subject {
    constructor(name, quantity, priority, store, section, price) {
        super()
        this.name = name;
        this.quantity = quantity;
        this.priority = priority;
        this.store = store;
        this.section = section;
        this.price = price;

        this._purchased = false;
    }
    get purchased(){
        return this._purchased;
    }
    set purchased(nv){
        if (this._purchased == false) {
            this._purchased = nv;
            this.publish('removed',this)
        } else {
            this._purchased = false;
            clearTimeout(this.to)
            this.publish('added',this)
        }
    }
}


class ShoppingList extends Subject{
    constructor() {
        super()
        this.newItems = [];
        this.lastSortedBy = null;
        this.descending = true;
    }
    
    addItem(it) {
        this.newItems.push(it);
        let self = this;
        it.subscribe(function(a,b) {
            self.publish('removed_start', self)
            if (it.purchased == true) {
                it.to = setTimeout(function() {
                    self.removeItem(it);
                }, 2000)
            }
        });
        this.publish('Add New Items', this)
    }

    removeItem(it) {
        let index = this.newItems.indexOf(it);
        if(index > -1){
            let it = this.newItems.splice(index, 1)
        }
        this.publish('Remove Items', this)
    }
    removeAll(){
            this.newItems=[]
            this.publish(this,'removed all items')
    }

    // save() {
    //     for (var property in this) {
    //         localStorage.setItem("shoppingList " + property, JSON.stringify(this[property]))
    //     }
    // }
    //
    // load() {
    //     for (var property in this) {
    //         this[property] = JSON.parse(localStorage.getItem("shoppingList " + property))
    //     }
    //     this.publish(this, "loading")
    // }

    sortBy(columnName) {

        columnName = columnName.toLowerCase()
        if (columnName == 'item') {
            columnName = 'name'
        }

        if (this.lastSortedBy == columnName) {
            this.descending = !this.descending
        } else {
            this.lastSortedBy = columnName
            this.descending = true
        }

        let self = this

        function compare(itemA, itemB) {
            if (self.descending) {
                return itemA[columnName] > itemB[columnName]
            } else {
                return itemA[columnName] < itemB[columnName]
            }
        }

        this.newItems.sort(compare)
        this.publish('colume sorted', this)
    }
}

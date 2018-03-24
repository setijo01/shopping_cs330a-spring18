class ShoppingView {
    constructor(model) {
        // The bind() method creates a new function that, when called, has its this keyword set to the provided value.
        //model.subscribe(this.redrawList.bind(this)) same as below
        let self = this;
        model.subscribe( function(a,b) {
            self.redrawList(a,b)
        })
    }

    redrawList(shoppingList, msg) {
        let tbl = document.getElementById("shoppinglist")
        tbl.innerHTML = ""
        if (Array.isArray(shoppingList.newItems)){
            for (let item of shoppingList.newItems) {
            this.addRow(item, tbl)
            }
        }

    }

    addRow(item, parent) {
        let row = document.createElement("tr")
        row.classList.add(item.priority)
        let cb = document.createElement("input")
        cb.type = "checkbox"
        cb.classList.add("form-control")
        cb.onclick = function() { item.purchased = true ? !item.purchased : false; }
        if (item.purchased){
            cb.checked = true;

        }
        row.appendChild(cb)
        
        for (let val of ['name', 'quantity', 'store', 'section', 'price']) {
            let td = document.createElement("td")
            td.innerHTML = item[val]
            if (item.purchased){
                td.classList.add('purchased')
            }
            row.appendChild(td)
        }
        parent.appendChild(row)
    }
}
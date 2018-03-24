// var stores = ['Fareway', 'Ace Hardware', 'Caseys', 'The Hatchery', 'Amundsens']
// var sections = ['Produce', 'Meats', 'Cereal', 'Canned Goods', 'Frozen Foods', 'Dairy', 'Liquor', 'Tools', 'Clothing']

var shoppingModel = new ShoppingList()
var myView = new ShoppingView(shoppingModel)
var storageManager= new StorageManager(shoppingModel,"shoppingList")
var flaskStorageManager= new FlaskStorageManager(shoppingModel)

function clickedon() {
    let rowcolids = ['itemname', 'qty', 'store', 'category', 'price', 'priority']
    let vals = {}
    for (let cid of rowcolids) {
        vals[cid] = document.getElementById(cid).value;
    }
    let it = new Item(vals.itemname, vals.qty, vals.priority, vals.store, vals.category, vals.price)
    shoppingModel.addItem(it)
}

// function populateSelect(selectId, sList) {
//     let sel = document.getElementById(selectId, sList)
//     for (let s of sList) {
//         let opt = document.createElement("option")
//         opt.value = s
//         opt.innerHTML = s
//         sel.appendChild(opt)
//     }
// }

function removeAll(){
    shoppingModel.removeAll()
}

function saveShoppingList(){
    flaskStorageManager.saveFlask(shoppingModel)
    // storageManager.save(shoppingModel)
}

function loadShoppingList(){
    flaskStorageManager.loadFlask()
    // storageManager.load()
}

// $(document).ready(function() {
//     populateSelect('store', stores)
//     populateSelect('category', sections)
// })

$(document).on('click','th',function(){
    shoppingModel.sortBy($(this).text())
})
"use strict"
class StorageManager{

    constructor(model,localStorageName){
        this.lsname=localStorageName
        this.model=model
        let self=this

        model.subscribe(function(slist,msg){
            self.autoSave(slist)
            //console.log("saved manually: "+self.lsname+"automatic")
        })

        let localStorageFetch=localStorage.getItem(self.lsname+"automatic")
        let restoredList=JSON.parse(localStorageFetch)
        if (restoredList!=null){
            for (let val of restoredList){
                let item = new Item(val.name, val.quantity, val.priority, val.store,
                    val.section, val.price)
                model.addItem(item)
                //console.log('restored automatically')
            }
        }
    }

    autoSave(shoppingList){
        let localStorageList= JSON.stringify(shoppingList.newItems)
        localStorage.setItem(this.lsname+"automatic", localStorageList)
    }

    save(shoppingList){
        let localStorageList= JSON.stringify(shoppingList.newItems)
        localStorage.setItem(this.lsname, localStorageList)
        //console.log("saved manually, variable name: "+this.lsname)
    }

    load(){
        this.model.removeAll()
        let restoredList=JSON.parse(localStorage.getItem(this.lsname))
        if (restoredList!=null){
            for (let val of restoredList){
                let item = new Item(val.name, val.quantity, val.priority, val.store,
                    val.section, val.price)
                this.model.addItem(item)
                //console.log('restored manually')
            }
        }
    }
}
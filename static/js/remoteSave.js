class FlaskStorageManager{

    constructor(model) {
        this.model = model
        let self = this
        model.subscribe(function(slist, msg) {
            self.saveFlask(slist, true)
        })
        this.loadFlask(true)
    }

    saveFlask(slist, auto=false) {
        let ls_list = JSON.stringify(slist.newItems)
        let post_string="/shoppinglist"
        if (auto==true){
            post_string=post_string+"auto"
        }

        let config={}
        config.method='POST'
        config.body=ls_list
        config.header={'Content-Type':'application/json','Accept':'application/json'}

        fetch(post_string,config)
    }

    loadFlask(auto=false){
        let model=this.model
        this.model.newItems = []

        let config={}
        config.method='GET'
        config.header={'Content-Type':'application/json','Accept':'application/json'}

        let get_string="/shoppinglist"
        if (auto==true){
            get_string= get_string+"auto"
        }
        let fromFlask=fetch(get_string, config)
            .then(function (response) { return response.json() })
            .catch(error => console.error("error: ", error))
            .then(function (myJson) {
                myJson=JSON.stringify(myJson)
                let restoredList=JSON.parse(myJson)
                if (restoredList!=null){
                    for (let val of restoredList){
                        let item = new Item(val.name, val.quantity, val.priority, val.store,
                            val.section, val.price)
                        model.addItem(item)
                    }
                }
            })
    }
}
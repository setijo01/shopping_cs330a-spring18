'use strict'
//var ViewThing =require('./view')

class Subject {
	constructor() {
		this.handlers =[];
	}

	subscribe(fn) {
		this.handlers.push(fn);
	}
	unsubscribe(fn) {
		this.handlers = this.handlers.filter(
			function(item){
				if (item!=fn) {
					return item;
				}
			}
		);
	}

	publish(msg, obj) {
		var scope = obj || window;
		for (let fn of this.handlers) {
			fn(scope,msg);
		}
	}
}

class Can extends Subject {
	constructor(h,r) {
		super();
		this._height = h;
		this.radius = r;
	}

	volume() {
		return this.radius*this.radius*Math.PI*this.height;
	}

	get height() {
		return this._height;
	}

	set height(n) {
		this._height = n;
		this.publish("changedheight",this);

	}
}

let model = new Can(10,2);

function ochange(scope,msg) {
	console.log(scope.volume());
	console.log(msg)
}

model.subscribe(ochange);

model.height = 20;
model.height = 5;
model.height = 3;




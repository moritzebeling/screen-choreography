export class Users {
    reset(){
        this.total = [];
        this.ordered = [];
        this.mobile = [];
        this.pressed = [];
    }
    constructor(){
        this.reset();
    }
    get stats(){
        return {
            total: this.total.length,
            ordered: this.ordered.length,
            mobile: this.mobile.length,
            pressed: this.pressed.length
        }
    }
    add(id, list = 'total'){
        if( !this[list].includes(id) ){
            this[list].push(id);
        }
    }
    remove(id, list = 'total'){
        if( list === 'all' ){
            this.total = this.total.filter((i) => i !== id);
            this.ordered = this.ordered.filter((i) => i !== id);
            this.mobile = this.mobile.filter((i) => i !== id);
            this.pressed = this.pressed.filter((i) => i !== id);
        } else {
            this[list] = this[list].filter((i) => i !== id);
        }
    }
    order(id, list = 'ordered'){
        this.remove(id,list);
        this.add(id,list);
    }
    getPosition(id){
        let order = 0;
        if( this.ordered.length > 0 ){
            order = this.ordered.indexOf(id);
        } else {
            order = this.total.indexOf(id);
        }
        return Math.max( 0, order );
    }
}
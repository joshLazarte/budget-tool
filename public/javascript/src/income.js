import { _bv } from './budget-vars';

//income object
class Income {
    constructor(source, amount, date, id){
        this.source = source;
        this.amount = amount;
        this.date   = date;
        this.id     = id;
    }
    addToIncomeArray(){
        _bv.incomeArray.push(this);
    }
    addToTotal(){
        _bv.totalIncome += this.amount;
    }
    init(){
        this.addToIncomeArray();
        this.addToTotal();
    }
    static createID(){
        let ID;
        if(_bv.incomeArray.length > 0){
            ID = (_bv.incomeArray[_bv.incomeArray.length - 1].id) + 1;
        } else {
            ID = 0;
        }
        return ID;
    }
    static getByID(id){
        let selectedItem;
        _bv.incomeArray.forEach((item) => {
           if (item.id === id){
               selectedItem = item;
           } 
        });
        return selectedItem;
    }
    static getByIdAndDelete(id){
        const ids = _bv.incomeArray.map(function(item){
            return item.id;
        });
        const index = ids.indexOf(id);
        _bv.incomeArray.splice(index, 1);
    }
}

export default Income;
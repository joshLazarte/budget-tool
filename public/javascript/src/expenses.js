import { _bv } from './budget-vars';
import Calculator from './calculator';
import { chartCtrl } from './chartControl';

//expense object
class Expense {
    constructor(name, category, amount, date, id){
        this.name     = name;
        this.category = category;
        this.amount   = amount;
        this.date     = date;
        this.id       = id;
    }
    addToExpenseArray(){
        _bv.expenseArray.push(this);
    }
    addToTotal(){
        _bv.totalExpenses += this.amount;
    }
    init(){
        this.addToExpenseArray();
        this.addToTotal();
        Expense.seperateCategories();
        Expense.getCategoryTotals();
    }
    static createID(){
        let ID;
        if(_bv.expenseArray.length > 0){
            ID = (_bv.expenseArray[_bv.expenseArray.length - 1].id) + 1;
        } else {
            ID = 0;
        }
        return ID;
    }
    static getByID(id){
        let selectedItem;
        _bv.expenseArray.forEach((item) => {
           if (item.id === id){
               selectedItem = item;
           } 
        });
        return selectedItem;
    }
    static getByIdAndDelete(id){
        const ids = _bv.expenseArray.map(function(item){
            return item.id;
        });
        const index = ids.indexOf(id);
        _bv.expenseArray.splice(index, 1);
    }
    static seperateCategories(){
        _bv.bills = _bv.expenseArray.filter(expense         => expense.category === 'bill');
        _bv.debt = _bv.expenseArray.filter(expense          => expense.category === 'debt');
        _bv.groceries = _bv.expenseArray.filter(expense     => expense.category === 'groceries');
        _bv.preparedFood = _bv.expenseArray.filter(expense  => expense.category === 'prepared food');
        _bv.entertainment = _bv.expenseArray.filter(expense => expense.category === 'entertainment');
        _bv.subscriptions = _bv.expenseArray.filter(expense => expense.category === 'subscriptions');
        _bv.misc = _bv.expenseArray.filter(expense          => expense.category === 'misc');
    }
    static getCategoryTotals(){
        _bv.totalBills         = 0,
        _bv.totalDebt          = 0,
        _bv.totalGroceries     = 0,     
        _bv.totalPreparedFood  = 0,
        _bv.totalEntertainment = 0,
        _bv.totalSubscriptions = 0,
        _bv.totalMisc          = 0,
        _bv.totalsArray        = [];
        
        _bv.bills.forEach((bill)         => {_bv.totalBills += bill.amount});
        _bv.debt.forEach((bill)          => {_bv.totalDebt += bill.amount});
        _bv.groceries.forEach((bill)     => {_bv.totalGroceries += bill.amount});
        _bv.preparedFood.forEach((bill)  => {_bv.totalPreparedFood += bill.amount});
        _bv.entertainment.forEach((bill) => {_bv.totalEntertainment += bill.amount});
        _bv.subscriptions.forEach((bill) => {_bv.totalSubscriptions += bill.amount});
        _bv.misc.forEach((bill)          => {_bv.totalMisc += bill.amount});
        
        
        
        let surplus;
        if(Calculator.getDifference() > 0){
            surplus = Number(Calculator.getDifference());
        } else {
            surplus = 0;
        }
        
        
        _bv.totalsArray = [
                surplus,
                _bv.totalBills,
                _bv.totalDebt,
                _bv.totalGroceries,
                _bv.totalPreparedFood,
                _bv.totalEntertainment,
                _bv.totalSubscriptions,
                _bv.totalMisc
            ];
            
            chartCtrl.addData(chartCtrl.myChart, _bv.totalsArray);
        
    }
}

export default Expense;
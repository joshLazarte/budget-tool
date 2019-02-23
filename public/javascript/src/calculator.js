import { _bv } from './budget-vars';

//calculations object
class Calculator{
    static getPercent(categoryTotal){
        if(_bv.totalIncome === 0){
            return 'N/A';
        } else {
        return ((categoryTotal / _bv.totalIncome) * 100).toFixed(1) + '%' ;
        }
    }
    static getExpensePercent(categoryTotal){
        if(_bv.totalExpenses === 0){
            return 'N/A';
        } else {
        return ((categoryTotal / _bv.totalExpenses) * 100).toFixed(1) + '%' ;
        }
    }
    static getDifference(){
        //console.log(_bv.totalIncome + " - " + _bv.totalExpenses);
        return (_bv.totalIncome - _bv.totalExpenses).toFixed(2);
    }
}

export default Calculator; 
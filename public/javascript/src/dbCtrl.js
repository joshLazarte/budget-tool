import { http } from './http';
import { _bv } from './budget-vars';
import UI from './ui';
import Income from './income.js';
import Expense from './expenses.js';

const dbCtrl = {
    getIncome: function(){
        http.get('https://j3l-webdesign-lazarte.c9users.io:8081/income')
        .then((data) => {
            UI.paintIncome(data);
            data.forEach((income) => {
                const _income = new Income(income.source, income.amount, income.date, income.id);
               _income.init();
            });
        })
        .then(() => {dbCtrl.getExpenses()})
        .catch(err => console.log(err));
    },
    postIncome: function(data){
        http.post('https://j3l-webdesign-lazarte.c9users.io:8081/income', data)
        .catch(err => console.log(err));
    },
    updateIncome: function(item){
      http.put(`https://j3l-webdesign-lazarte.c9users.io:8081/income/${item.id}`, item)
      .catch(err => console.log(err));
    },
    deleteIncome: function(id){
        http.delete(`https://j3l-webdesign-lazarte.c9users.io:8081/income/${id}`)
        .catch(err => console.log(err));
    },
    getExpenses: function(){
        http.get('https://j3l-webdesign-lazarte.c9users.io:8081/expenses')
        .then((data) => {
            UI.paintExpenses(data);
            data.forEach((expense) => {
                const _expense = new Expense(expense.name, expense.category, expense.amount, expense.date, expense.id);
                 _expense.init();
            });
        })
        .then(() => {UI.addDataToUI()})
        .catch(err => console.log(err));
    },
    postExpense: function(data){
        http.post('https://j3l-webdesign-lazarte.c9users.io:8081/expenses', data)
        .catch(err => console.log(err));
    },
    updateExpense: function(item){
      http.put(`https://j3l-webdesign-lazarte.c9users.io:8081/expenses/${item.id}`, item) 
      .catch(err => console.log(err));
    },
    deleteExpense: function(id){
        http.delete(`https://j3l-webdesign-lazarte.c9users.io:8081/expenses/${id}`)
        .catch(err => console.log(err));
    },
    saveMonth: function(data) {
        http.post('https://j3l-webdesign-lazarte.c9users.io:8081/months', data)
        .catch(err => console.log(err));
    },
    loadMonth: function(id) {
        http.get(`https://j3l-webdesign-lazarte.c9users.io:8081/months/${id}`)
        .then((data) => {
            data.data.incomeArray.forEach(income => {
                const _income = new Income(income.source, income.amount, income.date, income.id);
               _income.init();
            });
            data.data.expenseArray.forEach(expense => {
                const _expense = new Expense(expense.name, expense.category, expense.amount, expense.date, expense.id);
                _expense.init();
            });
        })
        .then(() => {UI.addDataToUI()})
        .catch(err => console.log(err));
    }
};

export default dbCtrl;
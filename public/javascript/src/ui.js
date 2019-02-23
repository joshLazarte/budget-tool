import { _bv } from './budget-vars';
import Calculator from './calculator';
import Income from './income';
import Expense from './expenses';
import './customPollyfills';

class UI{
    static addIncome(){
        const source = document.getElementById('income-source');
        const amount = document.getElementById('income-amount');
        const date = document.getElementById('income-date');
        
        const incomeList = document.getElementById('income-list');
        const ID = Income.createID();
        const income = new Income(source.value, Number(amount.value), date.value, ID);
        
        income.init();
       
        const uiIncome = document.createElement('li');
        uiIncome.id = `income-${income.id}`;
        uiIncome.innerHTML = `
            ${income.source}: $${income.amount} <br> ${income.date}
            <span class="u-float-right">
                <i class="fa fa-pencil edit-btn" aria-hidden="true"></i> 
                <i class="fa fa-trash-o delete-btn" aria-hidden="true"></i>
            <span>`;
        incomeList.appendChild(uiIncome);
        
        source.value = '';
        amount.value = '';
        date.value   = '';
        
        Expense.getCategoryTotals();
    }
    
    static paintIncome(income){
        const incomeList = document.getElementById('income-list');
        income.forEach(income => {
            const uiIncome = document.createElement('li');
            uiIncome.id = `income-${income.id}`;
            uiIncome.innerHTML = `
                ${income.source}: $${income.amount} <br> ${income.date}
                <span class="u-float-right">
                    <i class="fa fa-pencil edit-btn" aria-hidden="true"></i> 
                    <i class="fa fa-trash-o delete-btn" aria-hidden="true"></i>
                <span>`;
            incomeList.appendChild(uiIncome);
        });
    }
    
    static deleteIncome(uiID, id){
        if(confirm("Are you sure?")){
            //remove from income array and total, recalculate values
            
            const itemPendingDelete = Income.getByID(id);
            
            _bv.totalIncome -= itemPendingDelete.amount;
            
            Income.getByIdAndDelete(id);
            
            this.updateTotalIncome();
            this.updateCounters();
            this.updateCategoryPercents();
            this.showMessage();
            
            //remove from ui
            document.getElementById(uiID).remove();
            
            Expense.getCategoryTotals();
        }
    }
    
    static editIncome(uiID, id){
        const source = document.getElementById('income-edit-source');
        const amount = document.getElementById('income-edit-amount');
        const date = document.getElementById('income-edit-date');
        
        const selectedItem = Income.getByID(id);
        
        this.openModal('income-edit-form');
        source.value = selectedItem.source;
        amount.value = selectedItem.amount;
        date.value   = selectedItem.date;
        
        _bv.stagedItem = selectedItem;
    }
    
    static updateIncome(){
        const source = document.getElementById('income-edit-source');
        const amount = document.getElementById('income-edit-amount');
        const date = document.getElementById('income-edit-date');
        
        _bv.totalIncome -= _bv.stagedItem.amount;
        
        _bv.stagedItem.source = source.value;
        _bv.stagedItem.amount = Number(amount.value);
        _bv.stagedItem.date = date.value;
        
        _bv.totalIncome += Number(_bv.stagedItem.amount);
        
        const ids = _bv.incomeArray.map(function(item){
            return item.id;
        });
        const index = ids.indexOf(_bv.stagedItem.id);
        _bv.incomeArray.splice(index, 1, _bv.stagedItem);
        
        document.getElementById(`income-${_bv.stagedItem.id}`).innerHTML =`
        ${_bv.stagedItem.source}: $${_bv.stagedItem.amount} <br> ${_bv.stagedItem.date} 
            <span class="u-float-right">
                <i class="fa fa-pencil edit-btn" aria-hidden="true"></i> 
                <i class="fa fa-trash-o delete-btn" aria-hidden="true"></i>
            <span>`;
            
            _bv.stagedItem = '';
            
            Expense.getCategoryTotals();
    }
    
    static addExpense(){
        const name = document.getElementById('expense-name');
        const category = document.getElementById('expense-category');
        const amount = document.getElementById('expense-amount');
        const date = document.getElementById('expense-date');
        
        const expenseList = document.getElementById('expense-list');
        const ID = Expense.createID();
        const expense = new Expense(name.value, category.value, Number(amount.value), date.value, ID);
        
        expense.init();
        
        const uiExpense = document.createElement('li');
        uiExpense.id = `expense-${expense.id}`;
        uiExpense.innerHTML = `
                ${expense.name}: $${expense.amount} <br> ${expense.date} 
                <span class="u-float-right">
                    <i class="fa fa-pencil edit-btn" aria-hidden="true"></i> 
                    <i class="fa fa-trash-o delete-btn" aria-hidden="true"></i>
                <span>`;
        expenseList.appendChild(uiExpense);
        
        name.value = '';
        category.value = '';
        amount.value = '';
        date.value   = '';
    }
    
    static paintExpenses(expenses) {
        const expenseList = document.getElementById('expense-list');
        expenses.forEach((expense) => {
             const uiExpense = document.createElement('li');
            uiExpense.id = `expense-${expense.id}`;
            uiExpense.innerHTML = `
                ${expense.name}: $${expense.amount} <br> ${expense.date} 
                <span class="u-float-right">
                    <i class="fa fa-pencil edit-btn" aria-hidden="true"></i> 
                    <i class="fa fa-trash-o delete-btn" aria-hidden="true"></i>
                <span>`;
            expenseList.appendChild(uiExpense);
        });
    }
    
    static deleteExpense(uiID, id){
        if(confirm("Are you sure?")){
            //remove from income array and total, recalculate values
            const itemPendingDelete = Expense.getByID(id);
            
            _bv.totalExpenses -= itemPendingDelete.amount;
            
            Expense.getByIdAndDelete(id);
            
            Expense.seperateCategories();
            Expense.getCategoryTotals();
            this.updateCategoryTotals();
            this.updateTotalExpenses();
            this.updateCounters();
            this.updateCategoryPercents();
            this.updateCategoryExpensePercents();
            this.showMessage();
            
            //remove from ui
            document.getElementById(uiID).remove();
        }
    }
    
    static editExpense(uiID, id){
        const name = document.getElementById('expense-edit-name');
        const category = document.getElementById('expense-edit-category');
        const amount = document.getElementById('expense-edit-amount');
        const date = document.getElementById('expense-edit-date');
        
        const selectedItem = Expense.getByID(id);
        
        this.openModal('expense-edit-form');
        name.value = selectedItem.name;
        category.value = selectedItem.category;
        amount.value = selectedItem.amount;
        date.value   = selectedItem.date;
        
        _bv.stagedItem = selectedItem;
    }
    
    static updateExpense(){
        const name = document.getElementById('expense-edit-name');
        const category = document.getElementById('expense-edit-category');
        const amount = document.getElementById('expense-edit-amount');
        const date = document.getElementById('expense-edit-date');
        
        _bv.totalExpenses -= _bv.stagedItem.amount;
        
        _bv.stagedItem.name = name.value;
        _bv.stagedItem.category = category.value;
        _bv.stagedItem.amount = Number(amount.value);
        _bv.stagedItem.date  = date.value;
        
        _bv.totalExpenses += Number(_bv.stagedItem.amount);
        
        const ids = _bv.expenseArray.map(function(item){
            return item.id;
        });
        const index = ids.indexOf(_bv.stagedItem.id);
        _bv.expenseArray.splice(index, 1, _bv.stagedItem);
        
        Expense.seperateCategories();
        Expense.getCategoryTotals();
        
        document.getElementById(`expense-${_bv.stagedItem.id}`).innerHTML =`
       ${_bv.stagedItem.name}: $${_bv.stagedItem.amount} <br> ${_bv.stagedItem.date} 
        <span class="u-float-right">
            <i class="fa fa-pencil edit-btn" aria-hidden="true"></i> 
            <i class="fa fa-trash-o delete-btn" aria-hidden="true"></i>
        <span>`;
        
        _bv.stagedItem = '';
    }
    
    static updateTotalIncome(){
        document.getElementById('total-income').innerHTML = `$${_bv.totalIncome}`;
    }
    
    static updateTotalExpenses(){
        document.getElementById('total-expense').innerHTML = `$${_bv.totalExpenses}`;
    }
    
    static updateCounters(){
        document.getElementById('billsLength').textContent = '(' + _bv.bills.length + ')';
        document.getElementById('debtLength').textContent = '(' + _bv.debt.length + ')';
        document.getElementById('groceriesLength').textContent = '(' + _bv.groceries.length + ')';
        document.getElementById('preparedFoodLength').textContent = '(' + _bv.preparedFood.length + ')';
        document.getElementById('entertainmentLength').textContent = '(' + _bv.entertainment.length + ')';
        document.getElementById('subscriptionsLength').textContent = '(' + _bv.subscriptions.length + ')';
        document.getElementById('inArLength').textContent = '(' + _bv.incomeArray.length + ')';
        document.getElementById('exArLength').textContent = '(' + _bv.expenseArray.length + ')';
        document.getElementById('miscLength').textContent = '(' + _bv.misc.length + ')';
    }
    
    static updateCategoryTotals(){
        const totalsContainers = document.querySelectorAll('.category-total-containers');
        totalsContainers[0].textContent = '$' + _bv.totalBills;
        totalsContainers[1].textContent = '$' + _bv.totalDebt;
        totalsContainers[2].textContent = '$' + _bv.totalGroceries;
        totalsContainers[3].textContent = '$' + _bv.totalPreparedFood;
        totalsContainers[4].textContent = '$' + _bv.totalEntertainment;
        totalsContainers[5].textContent = '$' + _bv.totalSubscriptions;
        totalsContainers[6].textContent = '$' + _bv.totalMisc;
    }
    
    static updateCategoryPercents(){
        const percentContainers = document.querySelectorAll('.category-percent-containers');
        percentContainers[0].textContent= Calculator.getPercent(_bv.totalBills);
        percentContainers[1].textContent= Calculator.getPercent(_bv.totalDebt);
        percentContainers[2].textContent= Calculator.getPercent(_bv.totalGroceries);
        percentContainers[3].textContent= Calculator.getPercent(_bv.totalPreparedFood);
        percentContainers[4].textContent= Calculator.getPercent(_bv.totalEntertainment);
        percentContainers[5].textContent= Calculator.getPercent(_bv.totalSubscriptions);
        percentContainers[6].textContent= Calculator.getPercent(_bv.totalMisc);
    }
    static updateCategoryExpensePercents(){
        const percentContainers = document.querySelectorAll('.category-expense-percent-containers');
        percentContainers[0].textContent= Calculator.getExpensePercent(_bv.totalBills);
        percentContainers[1].textContent= Calculator.getExpensePercent(_bv.totalDebt);
        percentContainers[2].textContent= Calculator.getExpensePercent(_bv.totalGroceries);
        percentContainers[3].textContent= Calculator.getExpensePercent(_bv.totalPreparedFood);
        percentContainers[4].textContent= Calculator.getExpensePercent(_bv.totalEntertainment);
        percentContainers[5].textContent= Calculator.getExpensePercent(_bv.totalSubscriptions);
        percentContainers[6].textContent= Calculator.getExpensePercent(_bv.totalMisc);
    }
    static showMessage(){
        const dif = Calculator.getDifference();
        const message = document.getElementById('message');
        message.style.display = 'block';
        if(dif > 0){
            message.style.background = '#44c932';
            message.textContent = `You are Under Budget by $${dif}`;
        } else if(dif < 0){
            message.style.background = '#ff1a1a';
            message.textContent = 'You are Over Budget by $' + (dif * -1);
        } else if(_bv.incomeArray.length === 0 && _bv.expenseArray.length === 0){
            message.style.display = 'none';
        } else {
            message.style.background = 'orange';
            message.textContent = 'You Broke Even... Be Careful!';
        }
    }
    
    static mainInit(firstFunction, secondFunction, modal){
        firstFunction();
        secondFunction();
        UI.updateCounters();
        UI.updateCategoryTotals();
        UI.updateCategoryPercents();
        UI.updateCategoryExpensePercents();
        UI.showMessage();
        if(modal) {
            UI.closeModal(modal);
        }
    }
    
    static addDataToUI() {
        UI.updateTotalIncome();
        UI.updateTotalExpenses();
        UI.updateCounters();
        UI.updateCategoryTotals();
        UI.updateCategoryPercents();
        UI.updateCategoryExpensePercents();
        UI.showMessage();
    }
    
    static openModal(modal){
        document.getElementById(modal).className += "-expanded";
        document.querySelector('.modal-background').className += "-expanded";
    }
    
    static closeModal(modal){
        document.getElementById(modal).className = "modal";
        document.querySelector('.modal-background-expanded').className = "modal-background";
    }
}

export default UI;


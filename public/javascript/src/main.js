import UI from './ui';
import { _bv } from './budget-vars';
import PdfCtrl from './PdfCtrl';
import initTable from './table';



const AppCtrl = (function(UI) {
    initTable();
    return {
        loadEventListeners: function() {
            //add income
            document.getElementById('income-form').addEventListener('submit', (e) => {
                {
                    UI.mainInit(UI.addIncome, UI.updateTotalIncome, 'income-form');
                    e.preventDefault();
                }
            });

            //update income
            document.getElementById('income-edit-form').addEventListener('submit', (e) => {
                {
                    UI.mainInit(UI.updateIncome, UI.updateTotalIncome, 'income-edit-form');
                    e.preventDefault();
                }
            });

            //add expense
            document.getElementById('expense-form').addEventListener('submit', (e) => {
                {
                    UI.mainInit(UI.addExpense, UI.updateTotalExpenses, 'expense-form');
                    e.preventDefault();
                }
            });

            //update expense
            document.getElementById('expense-edit-form').addEventListener('submit', (e) => {
                {
                    UI.mainInit(UI.updateExpense, UI.updateTotalExpenses, 'expense-edit-form');
                    e.preventDefault();
                }
            });

            //show create income form
            document.getElementById("open-income").addEventListener('click', (e) => {
                UI.openModal('income-form');
                e.preventDefault();
            });

            //show edit income form
            document.getElementById('income-list').addEventListener('click', (e) => {
                if (e.target.classList.contains('edit-btn')) {
                    const uiID = e.target.parentNode.parentNode.id;
                    const id = Number(uiID.slice(7));
                    UI.editIncome(uiID, id);
                }
            });

            //show create expense form
            document.getElementById("open-expenses").addEventListener('click', (e) => {
                UI.openModal('expense-form');
                e.preventDefault();
            });

            //show edit expense form
            document.getElementById('expense-list').addEventListener('click', (e) => {
                if (e.target.classList.contains('edit-btn')) {
                    const uiID = e.target.parentNode.parentNode.id;
                    const id = Number(uiID.slice(8));
                    UI.editExpense(uiID, id);
                }
            });

            //close add income form
            document.getElementById('close-income').addEventListener('click', (e) => {
                UI.closeModal('income-form');
            });

            //close add expense form
            document.getElementById('close-expenses').addEventListener('click', (e) => {
                UI.closeModal('expense-form');
            });

            //close edit income form
            document.getElementById('close-edit-income').addEventListener('click', (e) => {
                UI.closeModal('income-edit-form');
            });

            //close edit expense form
            document.getElementById('close-edit-expenses').addEventListener('click', (e) => {
                UI.closeModal('expense-edit-form');
            });

            //delete income
            document.getElementById('income-list').addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn')) {
                    const uiID = e.target.parentNode.parentNode.id;
                    const id = Number(uiID.slice(7));
                    UI.deleteIncome(uiID, id);
                }
            });

            //delete expense
            document.getElementById('expense-list').addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn')) {
                    const uiID = e.target.parentNode.parentNode.id;
                    const id = Number(uiID.slice(8));
                    UI.deleteExpense(uiID, id);
                }
            });

            //save as pdf
            document.querySelector('.pdf-save').addEventListener('click', (e) => {
                UI.openModal('loading-gif');
                PdfCtrl.savePdf(_bv, UI.closeModal, 'loading-gif', UI.openModal, 'download-pdf');
                e.preventDefault();
            });

            //close pdf download modal on exit
            document.getElementById('close-pdf-download').addEventListener('click', () => {
                PdfCtrl.deletePdf(UI.closeModal, 'download-pdf');
            });

            //close pdf download modal on submit
            document.getElementById('download-submit').addEventListener('click', () => {
                UI.closeModal('download-pdf');
                PdfCtrl.pdfWritten = false;
            });

            //delete pdf on refresh or redirect
            window.onbeforeunload = () => {
                if (PdfCtrl.pdfWritten) {
                    PdfCtrl.deletePdf();
                }
            };
        }
    };
})(UI);

AppCtrl.loadEventListeners();

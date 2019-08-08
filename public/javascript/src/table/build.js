const tableContainer = document.getElementById('table');

const buildTable = () => {
    const table = document.createElement('table');
    table.className = 'results-table';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headers = [];
    const rows = [];
    const rowTitles = [];

    for (let i = 0; i < 8; i++) {
        const header = document.createElement('th');
        headers.push(header);
    }

    headers[1].innerHTML = 'Bills <span id="billsLength"></span>';
    headers[2].innerHTML = 'Debt <span id="debtLength"></span>';
    headers[3].innerHTML = 'Groceries <span id="groceriesLength"></span>';
    headers[4].innerHTML = 'Prepared Food <span id="preparedFoodLength"></span>';
    headers[5].innerHTML = 'Entertainment <span id="entertainmentLength"></span>';
    headers[6].innerHTML = 'Subscriptions <span id="subscriptionsLength"></span>';
    headers[7].innerHTML = 'Miscellaneous <span id="miscLength"></span>';


    for (let i = 0; i < 3; i++) {
        const title = document.createElement('th');
        title.scope = 'row';
        rowTitles.push(title);
    }

    rowTitles[0].innerHTML = 'Total';
    rowTitles[1].innerHTML = '% of Income';
    rowTitles[2].innerHTML = '% of Expenses';


    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        rows.push(row);
    }


    headers.forEach(item => {
        thead.appendChild(item);
    });

    table.appendChild(thead);
    tableContainer.appendChild(table);
};

export default buildTable;

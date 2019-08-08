import tableVars from './tableVars';

const {
    totalContainers,
    percentContainers,
    expensePercentContainers,
    catagoryHeaders,
    percentHeaders,
    table,
    thead,
    tbody,
    tableContainer
} = tableVars;

const buildElementArrays = (count, element, array) => {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(element);
        array.push(el);
    }
};

const buildTds = () => {
    const classNames = [
        'category-total-containers',
        'category-percent-containers',
        'category-expense-percent-containers'
    ];

    buildElementArrays(7, 'td', totalContainers);
    buildElementArrays(7, 'td', percentContainers);
    buildElementArrays(7, 'td', expensePercentContainers);

    const tds = [
        [...totalContainers],
        [...percentContainers],
        [...expensePercentContainers]
    ];

    tds.forEach((group, index) => {
        group.forEach(item => {
            item.className = classNames[index];
        });
    });
};

const buildCategoryHeaders = () => {
    buildElementArrays(8, 'th', catagoryHeaders);
    catagoryHeaders[1].innerHTML = 'Bills <span id="billsLength"></span>';
    catagoryHeaders[2].innerHTML = 'Debt <span id="debtLength"></span>';
    catagoryHeaders[3].innerHTML = 'Groceries <span id="groceriesLength"></span>';
    catagoryHeaders[4].innerHTML = 'Prepared Food <span id="preparedFoodLength"></span>';
    catagoryHeaders[5].innerHTML = 'Entertainment <span id="entertainmentLength"></span>';
    catagoryHeaders[6].innerHTML = 'Subscriptions <span id="subscriptionsLength"></span>';
    catagoryHeaders[7].innerHTML = 'Miscellaneous <span id="miscLength"></span>';
};

const buildPercentHeaders = () => {
    buildElementArrays(3, 'th', percentHeaders);
    percentHeaders[0].innerHTML = 'Total';
    percentHeaders[1].innerHTML = '% of Income';
    percentHeaders[2].innerHTML = '% of Expenses';
};

const buildTableComponents = () => {
    buildCategoryHeaders();
    buildPercentHeaders();
    buildTds();
};

const buildTable = () => {
    table.className = 'results-table';
    table.append(thead, tbody);
    tableContainer.append(table);
};

export { buildElementArrays, buildTable, buildTableComponents };

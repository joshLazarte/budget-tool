import tableVars from './tableVars';
import { buildElementArrays } from './buildTable';

const {
    totalContainers,
    percentContainers,
    expensePercentContainers,
    catagoryHeaders,
    percentHeaders,
    thead,
    tbody,
    breakPoint
} = tableVars;

const clearTable = () => {
    thead.innerHTML = '';
    tbody.innerHTML = '';
};

const setLargeTableContent = () => {
    const rows = [];
    buildElementArrays(3, 'tr', rows);
    rows[0].append(percentHeaders[0]);
    rows[1].append(percentHeaders[1]);
    rows[2].append(percentHeaders[2]);

    rows[0].append(...totalContainers);
    rows[1].append(...percentContainers);
    rows[2].append(...expensePercentContainers);

    clearTable();
    thead.append(...catagoryHeaders);
    tbody.append(...rows);
};

const setSmallTableContent = () => {
    const rows = [];
    buildElementArrays(7, 'tr', rows);
    rows.forEach((row, index) => {
        row.append(
            catagoryHeaders[index + 1],
            totalContainers[index], percentContainers[index],
            expensePercentContainers[index]);
    });

    clearTable();
    thead.append(document.createElement('th'), ...percentHeaders);
    tbody.append(...rows);
};

const fillTable = () => {
    breakPoint.matches ? setSmallTableContent() : setLargeTableContent();
};

const handleResize = () => {
    let resizeId;
    window.addEventListener('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(fillTable, 500);
    });
};

export { fillTable, handleResize };

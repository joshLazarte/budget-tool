const tableVars = {
    breakPoint: window.matchMedia("(max-width: 1000px)"),
    tableContainer: document.getElementById('table'),
    table: document.createElement('table'),
    thead: document.createElement('thead'),
    tbody: document.createElement('tbody'),
    catagoryHeaders: [],
    percentHeaders: [],
    totalContainers: [],
    percentContainers: [],
    expensePercentContainers: []
};

export default tableVars;

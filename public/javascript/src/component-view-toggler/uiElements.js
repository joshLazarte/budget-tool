const _ = id => document.getElementById(id);

const _ui = Object.freeze({
    toggleTableBtn: _('toggle-table-btn'),
    toggleChartBtn: _('toggle-chart-btn'),
    toggleListBtn: _('toggle-list-btn'),
    tableContainer: _('table'),
    chartContainer: _('chart-container'),
    listContainer: _('budget-list')
});

export default _ui;

import _ui from './uiElements';

const relatedComponents = [{
        btn: _ui.toggleTableBtn,
        component: _ui.tableContainer
    },
    {
        btn: _ui.toggleChartBtn,
        component: _ui.chartContainer
    },
    {
        btn: _ui.toggleListBtn,
        component: _ui.listContainer
    }
];

const toggleText = (el) => {
    let text = el.textContent.split(' ');
    let firstWord = text[0];
    firstWord === 'Show' ?
        text[0] = 'Hide' :
        text[0] = 'Show';
    el.textContent = text.join(' ');
};

const toggleView = (el) => {
    el.style.display === 'block' ?
        el.style.display = 'none' :
        el.style.display = 'block';
};

const controlView = group => {
    toggleView(group.component);
    toggleText(group.btn);
};

const componentViewCtrl = () => {
    relatedComponents.forEach(group => {
        group.btn.addEventListener('click', () => controlView(group));
    });
};

export default componentViewCtrl;

import {buildTable, buildTableComponents} from './buildTable';
import { fillTable, handleResize } from './arrangeTable';

const initTable = () => {
    buildTable();
    buildTableComponents();
    fillTable();
    handleResize();
};

export default initTable;

import moment from 'moment';
import Render from './components/render';


/**
 * Main Entry
 */
const target = document.createElement('div');
target.className = 'wrapper';

window.onload=()=>{
    document.body.appendChild(target);
    const demo = new Render(target);
    return demo;
}
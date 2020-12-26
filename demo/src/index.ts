import './index.scss';

import Spinner, {SpinnerAction, SpinnerElement} from '../../src/Spinner';

Spinner.init();

/* Test: 1. */
document.body.addEventListener('click', (event: Event) => {
    const element = event.target as Element;
    if (!element.classList.contains('subtraction') && !element.classList.contains('addition')) return;

    const spinner = document.querySelector('.test-1 .spinner') as SpinnerElement;
    let step = Number(element.getAttribute('data-value'));
    let action: SpinnerAction = 'subtraction';

    if (element.classList.contains('addition')) action = 'addition' as SpinnerAction;

    Spinner.accelerate(spinner, action, step);
});


/* Reset. */
const reset = document.querySelector('.reset')!;

reset.addEventListener('click', () => {
    const spinners = Array.prototype.slice.call(document.querySelectorAll('.content .spinner')) as SpinnerElement[];

    for (const spinner of spinners) {
        Spinner.reset(spinner);
    }
});

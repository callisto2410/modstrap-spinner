interface SpinnerElement extends HTMLDivElement {
    spinner: SpinnerDefaults;
}

interface SpinnerDefaults {
    min: number;
    max: number;
    step: number;
    fraction: number;
    value: string;
    default: string;
    pattern: string;
}

type SpinnerProperties = Partial<SpinnerDefaults>;

type SpinnerAction = 'addition' | 'subtraction';

/**
 * Spinner widget with support for custom value patterns.
 *
 * @see init
 * @see accelerate
 * @see reset
 * @see valueOf
 */
class Spinner {
    /**
     * CSS selector for value container.
     *
     * @private
     */
    private static value: string = 'spinner-value';

    /**
     * CSS selector for subtract button.
     *
     * @private
     */
    private static subtraction: string = 'spinner-subtraction';

    /**
     * CSS selector for addition button.
     *
     * @private
     */
    private static addition: string = 'spinner-addition';

    /**
     * Value change event.
     *
     * @private
     */
    private static change: Event = new Event('change');

    /**
     * Click event for addition/subtraction buttons.
     *
     * @private
     */
    private static click: Event = new Event('click', {
        bubbles: true,
    });

    /**
     * Prevents re-setting of the event listener.
     *
     * @private
     */
    private static listenerExists: boolean = false;

    /**
     * Default settings.
     *
     * @private
     */
    private static defaults: SpinnerDefaults = {
        min: 1,
        max: 1_000_000,
        step: 1,
        fraction: 2,
        value: '1',
        default: '1',
        pattern: '([-\\d.]+)',
    }

    /**
     * Initialization.
     */
    static init() {
        if (!this.listenerExists) {
            document.body.addEventListener('click', this.handler.bind(this));
            this.listenerExists = true;
        }
    }

    /**
     * Event handling.
     *
     * @param event
     * @private
     */
    private static handler(event: Event): void {
        const target = event.target as Element;
        if (!this.isSpinner(target)) return;

        const element = target.closest('.spinner') as SpinnerElement;
        this.checkProperties(element);

        const value = element.querySelector('.' + this.value) as Element;
        const regexp = new RegExp(element.spinner.pattern, 'g');
        let changed = false;

        value.innerHTML = value.innerHTML.replace(regexp, (source: string, match: string) => {
            const {
                min,
                max,
                step,
                fraction,
            } = element.spinner;
            let expected = Number(match);

            if (this.isAddition(target)) expected = Number((expected + step).toFixed(fraction));
            if (this.isSubtraction(target)) expected = Number((expected - step).toFixed(fraction));

            if (expected >= min && expected <= max) {
                changed = true;

                return source.replace(match, String(expected));
            }

            return source;
        });

        element.spinner.value = value.innerHTML;
        (changed) && element.dispatchEvent(this.change);
    }

    /**
     * Checks the existence of spinner properties.
     *
     * @param element
     * @private
     */
    private static checkProperties(element: SpinnerElement): void {
        if (!element.spinner) this.setProperties(element);
    }

    /**
     * Returns true if the specified element is a spinner, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isSpinner(element: Element): boolean {
        return (element.classList.contains(this.subtraction) || element.classList.contains(this.addition));
    }

    /**
     * Returns true if the specified element is a addition, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isAddition(element: Element): boolean {
        return element.classList.contains(this.addition);
    }

    /**
     * Returns true if the specified element is a subtraction, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isSubtraction(element: Element): boolean {
        return element.classList.contains(this.subtraction);
    }

    /**
     * Sets properties for the specified element.
     *
     * @param element
     * @private
     */
    private static setProperties(element: SpinnerElement): void {
        const properties = this.getProperties(element);

        element.spinner = {...this.defaults, ...properties};
        element.spinner.default = properties.value ?? this.defaults.value;

        const value = element.querySelector('.' + this.value) as Element;
        value.innerHTML = element.spinner.value;
    }

    /**
     * Returns the properties for the specified element.
     *
     * @param element
     * @private
     */
    private static getProperties(element: SpinnerElement): SpinnerProperties {
        const dataset = element.dataset ?? {};

        return {
            min: Number(dataset.spinnerMin ?? this.defaults.min),
            max: Number(dataset.spinnerMax ?? this.defaults.max),
            step: Number(dataset.spinnerStep ?? this.defaults.step),
            fraction: Number(dataset.spinnerFraction ?? this.defaults.fraction),
            value: dataset.spinnerValue ?? this.defaults.value,
            pattern: dataset.spinnerPattern ?? this.defaults.pattern,
        }
    }

    /**
     * Increases/Decreases the value by the specified step.
     *
     * @param element
     * @param action
     * @param step
     */
    static accelerate(element: SpinnerElement, action: SpinnerAction, step: number): void {
        this.checkProperties(element);

        const origin = element.spinner.step;
        let button;

        if (action === 'subtraction') button = element.querySelector('.' + this.subtraction);
        if (action === 'addition') button = element.querySelector('.' + this.addition);

        if (button) {
            element.spinner.step = step;
            button.dispatchEvent(this.click);
            element.spinner.step = origin;
        }
    }

    /**
     * Resets the spinner value to its original value.
     *
     * @param element
     */
    static reset(element: SpinnerElement): void {
        this.checkProperties(element);

        const value = element.querySelector('.' + this.value)!;
        if (value.innerHTML === element.spinner.default) return;

        value.innerHTML = element.spinner.default;
        element.spinner.value = value.innerHTML;

        element.dispatchEvent(this.change);
    }

    /**
     * Returns the value of the specified spinner.
     *
     * @param element
     */
    static valueOf(element: SpinnerElement): string {
        this.checkProperties(element);

        return element.spinner.value;
    }
}

Spinner.init();

export default Spinner;
export {
    SpinnerAction,
    SpinnerElement,
}

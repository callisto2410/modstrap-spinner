export interface SpinnerElement extends HTMLDivElement {
    spinner: SpinnerDefaults;
}

export interface SpinnerDefaults {
    /**
     * Minimum possible value (inclusive).
     */
    min: number;

    /**
     * Maximum possible value (inclusive).
     */
    max: number;

    /**
     * Step of increasing/decreasing the value.
     */
    step: number;

    /**
     * The number of digits after the dot.
     */
    fraction: number;

    /**
     * The initial value.
     */
    value: string;

    /**
     * The default value.
     */
    default: string;

    /**
     * RegExp to determine the value to be increased/decreased.
     */
    pattern: string;
}

export type SpinnerProperties = Partial<SpinnerDefaults>;

export type SpinnerAction = "addition" | "subtraction";

/**
 * Spinner widget with support for custom value patterns.
 *
 * @see bind
 * @see accelerate
 * @see reset
 * @see getValue
 * @see setValue
 */
export class Spinner {
    /**
     * CSS selector for value container.
     *
     * @private
     */
    private static value: string = "spinner-value";

    /**
     * CSS selector for subtract button.
     *
     * @private
     */
    private static subtraction: string = "spinner-subtraction";

    /**
     * CSS selector for addition button.
     *
     * @private
     */
    private static addition: string = "spinner-addition";

    /**
     * Value change event.
     *
     * @private
     */
    private static change: Event = new Event("change");

    /**
     * Click event for addition/subtraction buttons.
     *
     * @private
     */
    private static click: Event = new Event("click", {
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
    private static _defaults: SpinnerDefaults = {
        min: 1,
        max: 1_000_000,
        step: 1,
        fraction: 2,
        value: "1",
        default: "1",
        pattern: "([-\\d.]+)",
    }

    /**
     * Default settings.
     *
     * @param properties
     */
    public static set defaults(properties: SpinnerProperties) {
        this._defaults = {
            ...this._defaults,
            ...properties,
        }
    }

    /**
     *  Setting up.
     *  Called by default when importing a module, no manual call required.
     */
    public static bind() {
        if (!this.listenerExists) {
            document.body.addEventListener("click", this.handler.bind(this));
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
        const target = event.target as HTMLElement;
        if (!this.isSpinner(target)) return;

        const element = target.closest(".spinner") as SpinnerElement;
        this.checkProperties(element);

        const spinnerValue = element.querySelector("." + this.value) as HTMLElement;
        const regexp = new RegExp(element.spinner.pattern, "g");
        let changed = false;

        spinnerValue.innerHTML = spinnerValue.innerHTML.replace(regexp, (source: string, match: string) => {
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

        element.spinner.value = spinnerValue.innerHTML;
        (changed) && element.dispatchEvent(this.change);
    }

    /**
     * Returns true if the specified element is a spinner, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isSpinner(element: HTMLElement): boolean {
        return (element.classList.contains(this.subtraction) || element.classList.contains(this.addition));
    }

    /**
     * Returns true if the specified element is a addition, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isAddition(element: HTMLElement): boolean {
        return element.classList.contains(this.addition);
    }

    /**
     * Returns true if the specified element is a subtraction, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isSubtraction(element: HTMLElement): boolean {
        return element.classList.contains(this.subtraction);
    }

    /**
     * Checks whether the element has spinner properties.
     * If necessary, sets the properties of the spinner.
     *
     * @param element
     * @private
     */
    private static checkProperties(element: SpinnerElement): void {
        if (!element.spinner) this.setProperties(element);
    }

    /**
     * Sets properties for the specified element.
     *
     * @param element
     * @private
     */
    private static setProperties(element: SpinnerElement): void {
        const properties = this.getProperties(element);

        element.spinner = {...this._defaults, ...properties};
        element.spinner.default = properties.value ?? this._defaults.value;

        const spinnerValue = element.querySelector("." + this.value) as HTMLElement;
        spinnerValue.innerHTML = element.spinner.value;
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
            min: Number(dataset.spinnerMin ?? this._defaults.min),
            max: Number(dataset.spinnerMax ?? this._defaults.max),
            step: Number(dataset.spinnerStep ?? this._defaults.step),
            fraction: Number(dataset.spinnerFraction ?? this._defaults.fraction),
            value: dataset.spinnerValue ?? this._defaults.value,
            pattern: dataset.spinnerPattern ?? this._defaults.pattern,
        }
    }

    /**
     * Increases/Decreases the value by the specified step.
     *
     * @param element
     * @param action
     * @param step
     */
    public static accelerate(element: SpinnerElement, action: SpinnerAction, step: number): void {
        this.checkProperties(element);

        const spinnerStep = element.spinner.step;
        const spinnerButton = (action === "addition")
            ? element.querySelector("." + this.addition) as HTMLElement | null
            : element.querySelector("." + this.subtraction) as HTMLElement | null;

        if (spinnerButton) {
            element.spinner.step = step;
            spinnerButton.dispatchEvent(this.click);
            element.spinner.step = spinnerStep;
        }
    }

    /**
     * Resets the spinner value to its original value.
     *
     * @param element
     */
    public static reset(element: SpinnerElement): void {
        this.checkProperties(element);

        const spinnerValue = element.querySelector("." + this.value) as HTMLElement | null;
        if (!spinnerValue || spinnerValue.innerHTML === element.spinner.default) return;

        spinnerValue.innerHTML = element.spinner.default;
        element.spinner.value = spinnerValue.innerHTML;

        element.dispatchEvent(this.change);
    }

    /**
     * Returns the value of the specified spinner.
     *
     * @param element
     */
    public static getValue(element: SpinnerElement): string {
        this.checkProperties(element);

        return element.spinner.value;
    }

    /**
     * Sets the specified value to the specified spinner.
     *
     * @param element
     * @param value
     */
    public static setValue(element: SpinnerElement, value: string): void {
        this.checkProperties(element);

        const spinnerValue = element.querySelector("." + this.value) as HTMLElement | null;
        if (!spinnerValue) return;

        spinnerValue.innerHTML = value;
        element.spinner.value = value;
    }
}

Spinner.bind();

export default Spinner;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    static handler(event) {
        const target = event.target;
        if (!this.isSpinner(target))
            return;
        const element = target.closest('.spinner');
        this.checkProperties(element);
        const value = element.querySelector('.' + this.value);
        const regexp = new RegExp(element.spinner.pattern, 'g');
        let changed = false;
        value.innerHTML = value.innerHTML.replace(regexp, (source, match) => {
            const { min, max, step, fraction, } = element.spinner;
            let expected = Number(match);
            if (this.isAddition(target))
                expected = Number((expected + step).toFixed(fraction));
            if (this.isSubtraction(target))
                expected = Number((expected - step).toFixed(fraction));
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
    static checkProperties(element) {
        if (!element.spinner)
            this.setProperties(element);
    }
    /**
     * Returns true if the specified element is a spinner, otherwise returns false.
     *
     * @param element
     * @private
     */
    static isSpinner(element) {
        return (element.classList.contains(this.subtraction) || element.classList.contains(this.addition));
    }
    /**
     * Returns true if the specified element is a addition, otherwise returns false.
     *
     * @param element
     * @private
     */
    static isAddition(element) {
        return element.classList.contains(this.addition);
    }
    /**
     * Returns true if the specified element is a subtraction, otherwise returns false.
     *
     * @param element
     * @private
     */
    static isSubtraction(element) {
        return element.classList.contains(this.subtraction);
    }
    /**
     * Sets properties for the specified element.
     *
     * @param element
     * @private
     */
    static setProperties(element) {
        var _a;
        const properties = this.getProperties(element);
        element.spinner = Object.assign(Object.assign({}, this.defaults), properties);
        element.spinner.default = (_a = properties.value) !== null && _a !== void 0 ? _a : this.defaults.value;
        const value = element.querySelector('.' + this.value);
        value.innerHTML = element.spinner.value;
    }
    /**
     * Returns the properties for the specified element.
     *
     * @param element
     * @private
     */
    static getProperties(element) {
        var _a, _b, _c, _d, _e, _f, _g;
        const dataset = (_a = element.dataset) !== null && _a !== void 0 ? _a : {};
        return {
            min: Number((_b = dataset.spinnerMin) !== null && _b !== void 0 ? _b : this.defaults.min),
            max: Number((_c = dataset.spinnerMax) !== null && _c !== void 0 ? _c : this.defaults.max),
            step: Number((_d = dataset.spinnerStep) !== null && _d !== void 0 ? _d : this.defaults.step),
            fraction: Number((_e = dataset.spinnerFraction) !== null && _e !== void 0 ? _e : this.defaults.fraction),
            value: (_f = dataset.spinnerValue) !== null && _f !== void 0 ? _f : this.defaults.value,
            pattern: (_g = dataset.spinnerPattern) !== null && _g !== void 0 ? _g : this.defaults.pattern,
        };
    }
    /**
     * Increases/Decreases the value by the specified step.
     *
     * @param element
     * @param action
     * @param step
     */
    static accelerate(element, action, step) {
        this.checkProperties(element);
        const origin = element.spinner.step;
        let button;
        if (action === 'subtraction')
            button = element.querySelector('.' + this.subtraction);
        if (action === 'addition')
            button = element.querySelector('.' + this.addition);
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
    static reset(element) {
        this.checkProperties(element);
        const value = element.querySelector('.' + this.value);
        if (value.innerHTML === element.spinner.default)
            return;
        value.innerHTML = element.spinner.default;
        element.spinner.value = value.innerHTML;
        element.dispatchEvent(this.change);
    }
    /**
     * Returns the value of the specified spinner.
     *
     * @param element
     */
    static valueOf(element) {
        this.checkProperties(element);
        return element.spinner.value;
    }
}
/**
 * CSS selector for value container.
 *
 * @private
 */
Spinner.value = 'spinner-value';
/**
 * CSS selector for subtract button.
 *
 * @private
 */
Spinner.subtraction = 'spinner-subtraction';
/**
 * CSS selector for addition button.
 *
 * @private
 */
Spinner.addition = 'spinner-addition';
/**
 * Value change event.
 *
 * @private
 */
Spinner.change = new Event('change');
/**
 * Click event for addition/subtraction buttons.
 *
 * @private
 */
Spinner.click = new Event('click', {
    bubbles: true,
});
/**
 * Prevents re-setting of the event listener.
 *
 * @private
 */
Spinner.listenerExists = false;
/**
 * Default settings.
 *
 * @private
 */
Spinner.defaults = {
    min: 1,
    max: 1000000,
    step: 1,
    fraction: 2,
    value: '1',
    default: '1',
    pattern: '([-\\d.]+)',
};
Spinner.init();
exports.default = Spinner;

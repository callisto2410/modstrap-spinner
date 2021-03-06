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
export interface SpinnerProperties extends Partial<SpinnerDefaults> {
}
export declare type SpinnerAction = "addition" | "subtraction";
/**
 * Spinner widget with support for custom value patterns.
 *
 * @see setListener
 * @see accelerate
 * @see reset
 * @see getValue
 * @see setValue
 *
 * Spinner:
 * [Github]{@link https://github.com/callisto2410/modstrap-spinner}
 */
export declare class Spinner {
    /**
     * CSS selector for value container.
     *
     * @private
     */
    private static readonly value;
    /**
     * CSS selector for subtract button.
     *
     * @private
     */
    private static readonly subtraction;
    /**
     * CSS selector for addition button.
     *
     * @private
     */
    private static readonly addition;
    /**
     * Value change event.
     *
     * @private
     */
    private static change;
    /**
     * Click event for addition/subtraction buttons.
     *
     * @private
     */
    private static click;
    /**
     * Prevents re-setting of the event listener.
     *
     * @private
     */
    private static listenerExists;
    /**
     * Default settings.
     *
     * @private
     */
    private static _defaults;
    /**
     * Default settings.
     *
     * @param properties
     */
    static set defaults(properties: SpinnerProperties);
    /**
     *  Setting up.
     *  Called by default when importing a module, no manual call required.
     */
    static setListener(): void;
    /**
     * Event handling.
     *
     * @param event
     * @private
     */
    private static handler;
    /**
     * Returns true if the specified element is a spinner, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isSpinner;
    /**
     * Returns true if the specified element is a addition, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isAddition;
    /**
     * Returns true if the specified element is a subtraction, otherwise returns false.
     *
     * @param element
     * @private
     */
    private static isSubtraction;
    /**
     * Checks whether the element has spinner properties.
     * If necessary, sets the properties of the spinner.
     *
     * @param element
     * @private
     */
    private static checkProperties;
    /**
     * Sets properties for the specified element.
     *
     * @param element
     * @private
     */
    private static setProperties;
    /**
     * Returns the properties for the specified element.
     *
     * @param element
     * @private
     */
    private static getProperties;
    /**
     * Increases/Decreases the value by the specified step.
     *
     * @param element
     * @param action
     * @param step
     */
    static accelerate(element: SpinnerElement, action: SpinnerAction, step: number): void;
    /**
     * Resets the spinner value to its original value.
     *
     * @param element
     */
    static reset(element: SpinnerElement): void;
    /**
     * Returns the value of the specified spinner.
     *
     * @param element
     */
    static getValue(element: SpinnerElement): string;
    /**
     * Sets the specified value to the specified spinner.
     *
     * @param element
     * @param value
     */
    static setValue(element: SpinnerElement, value: string): void;
}
export default Spinner;

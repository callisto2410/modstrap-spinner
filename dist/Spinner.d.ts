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
declare type SpinnerAction = 'addition' | 'subtraction';
/**
 * Spinner widget with support for custom value patterns.
 *
 * @see init
 * @see accelerate
 * @see reset
 * @see valueOf
 */
declare class Spinner {
    /**
     * CSS selector for value container.
     *
     * @private
     */
    private static value;
    /**
     * CSS selector for subtract button.
     *
     * @private
     */
    private static subtraction;
    /**
     * CSS selector for addition button.
     *
     * @private
     */
    private static addition;
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
    private static defaults;
    /**
     * Initialization.
     */
    static init(): void;
    /**
     * Event handling.
     *
     * @param event
     * @private
     */
    private static handler;
    /**
     * Checks the existence of spinner properties.
     *
     * @param element
     * @private
     */
    private static checkProperties;
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
    static valueOf(element: SpinnerElement): string;
}
export default Spinner;
export { SpinnerAction, SpinnerElement, };

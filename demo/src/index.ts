import "./index.scss";

import Spinner, {SpinnerAction, SpinnerElement} from "../../src/Spinner";

Spinner.defaults = {
    step: 2,
}

/* Test: 1. */
document.body.addEventListener("click", (event: Event) => {
    const element = event.target as Element;

    if (element.classList.contains("subtraction") || element.classList.contains("addition")) {
        const spinnerElement = document.querySelector(".test-1 .spinner") as SpinnerElement;
        const step = Number(element.getAttribute("data-value"));
        const action: SpinnerAction = (element.classList.contains("addition")) ? "addition" : "subtraction";

        Spinner.accelerate(spinnerElement, action, step);
        console.log(Spinner.getValue(spinnerElement));
    }

    if (element.classList.contains("set")) {
        const spinnerElement = document.querySelector(".test-1 .spinner") as SpinnerElement;
        const value = element.getAttribute("data-value") ?? spinnerElement.spinner.default;

        Spinner.setValue(spinnerElement, value);
        console.log(Spinner.getValue(spinnerElement));
    }
});


/* Reset. */
const reset = document.querySelector(".reset")!;

reset.addEventListener("click", () => {
    const spinners = Array.prototype.slice.call(document.querySelectorAll(".content .spinner")) as SpinnerElement[];

    for (const spinner of spinners) {
        Spinner.reset(spinner);
    }
});

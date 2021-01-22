import "./index.scss";

import Spinner, {SpinnerAction, SpinnerElement} from "../../src/Spinner";

Spinner.defaults = {
    step: 2,
}

/* Test: 1. */
document.body.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("subtraction") || target.classList.contains("addition")) {
        const spinnerElement = document.querySelector(".test-1 .spinner") as SpinnerElement;
        const step = Number(target.getAttribute("data-value"));
        const action: SpinnerAction = (target.classList.contains("addition")) ? "addition" : "subtraction";

        Spinner.accelerate(spinnerElement, action, step);
        console.log(Spinner.getValue(spinnerElement));
    }

    if (target.classList.contains("set")) {
        const spinnerElement = document.querySelector(".test-1 .spinner") as SpinnerElement;
        const value = target.getAttribute("data-value") ?? spinnerElement.spinner.default;

        Spinner.setValue(spinnerElement, value);
        console.log(Spinner.getValue(spinnerElement));
    }
});


/* Reset. */
const reset = document.querySelector(".reset") as HTMLElement;

reset.addEventListener("click", () => {
    const elements = Array.prototype.slice.call(document.querySelectorAll(".content .spinner")) as SpinnerElement[];

    for (const spinner of elements) {
        Spinner.reset(spinner);
    }
});

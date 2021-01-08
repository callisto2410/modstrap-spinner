import "./index.scss";

import Spinner, {SpinnerAction, SpinnerElement} from "../../src/Spinner";

Spinner.defaults = {
    step: 2,
}

/* Test: 1. */
document.body.addEventListener("click", (event: Event) => {
    const element = event.target as Element;
    if (!element.classList.contains("subtraction") && !element.classList.contains("addition")) return;

    const spinner = document.querySelector(".test-1 .spinner") as SpinnerElement;
    const step = Number(element.getAttribute("data-value"));
    const action: SpinnerAction = (element.classList.contains("addition")) ? "addition": "subtraction";

    Spinner.accelerate(spinner, action, step);
});


/* Reset. */
const reset = document.querySelector(".reset")!;

reset.addEventListener("click", () => {
    const spinners = Array.prototype.slice.call(document.querySelectorAll(".content .spinner")) as SpinnerElement[];

    for (const spinner of spinners) {
        Spinner.reset(spinner);
    }
});

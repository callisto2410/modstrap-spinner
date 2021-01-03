# modstrap-spinner

Spinner widget with support for custom value patterns.

## Installation

To install a specific version:
```shell script
npm i https://github.com/callisto2410/modstrap-spinner.git#v1.0.0
```

To install the current version:
```shell script
npm i https://github.com/callisto2410/modstrap-spinner.git
```

## Usage

HTML
```html
<div class="spinner" 
     data-spinner-min="-500" 
     data-spinner-max="500" 
     data-spinner-value="0&#179;">
    <div class="spinner-subtraction"></div>
    <div class="spinner-value">0&#179;</div>
    <div class="spinner-addition"></div>
</div>
```

SCSS
```scss
@use '~@modstrap/spinner';
```
TypeScript
```ts
import Spinner from "@modstrap/spinner";
```

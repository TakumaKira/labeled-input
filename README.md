# Labeled Input ![language](https://img.shields.io/badge/language-javascript-blue.svg)

## :books: Table of Contents

- [Labeled Input](#labeled-input-)
  - [:books: Table of Contents](#books-table-of-contents)
  - [:dizzy: Working example](#dizzy-working-example)
  - [:package: Installation](#package-installation)
    - [Include this as a module via CDN](#include-this-as-a-module-via-cdn)
  - [:rocket: Usage](#rocket-usage)

## :dizzy: Working example

You can try this [here](https://takumakira.github.io/labeled-input/).

## :package: Installation

### Include this as a module via CDN

I recommend using this as a module via CDN, which is the way I intended to use this for my own project. Other ways might work, but I have never tested them at this point.

```html
<script src="https://unpkg.com/labeled-input" type="module"></script>
```

## :rocket: Usage

```html
<labeled-input
  id="my-input"
  font-google="Roboto Slab"
  font-fallback="serif"
  font-weight="100"
  font-size="30px"
  label-font-size="20px"
  label="Password"
  value="initial value"
  type="password"
  background-color="grey"
  input-color="white"
  underline-color="violet"
  label-color="cyan"
  underline-height="3px"
  underline-height-focused="6px"
></labeled-input>
```

Get the reference to the element.

```javascript
const myInput = document.getElementById("my-input")
```

You can get the input event like below.

```javascript
myInput.addEventListener("oninput", event => console.log(event.detail.value))
```

But unfortunately, you can't set the listener like ```<labeled-input oninput="getValue(this)"></labeled-input>```
because there's no way to set any reference to web component's attribute for now(it supports only strings for now).

You can get the value like below.

```javascript
function getValue() {
  console.log(myInput.value)
}
```

And set the value like below.

```javascript
function setValue() {
  myInput.value = "set value"
}
```

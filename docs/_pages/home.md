---
layout: project
title: home
permalink: /
banner:
  title: "jQuery plugin for blur overlay"
  description: "Plugin that creates an element which blurs elements behind it (background elements). Also provides API to created a blurred modal/mask. Requires jQuery library."
---
## Installation

Install using either of below package manager.

* __npm__: `npm install --save bluroverlay.js`
* __bower__: `bower install --save bluroverlay.js`

Or download plugin library directly:

* [Development](https://raw.githubusercontent.com/hardikdabhi/bluroverlay.js/master/dist/bluroverlay.js) (unminified, ~4kb)
* [Production](https://raw.githubusercontent.com/hardikdabhi/bluroverlay.js/master/dist/bluroverlay.min.js) (minified, ~3kb)

## Usage

Basic HTML

```html
<!DOCTYPE html>
<html>
<head>

</head>
<body>
	<!-- fixed element, which will blur elements behind it -->
	<div id="element-id">
		<p>... top element html here ...</p>
	</div>
	<!-- scrollable content, rest of elements -->
	<div class="content-wrapper-class">
		<p>... your html here ...</p>
	</div>

	<!-- include jQuery library and blur overlay plugin -->
	<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
	<script src="dist/bluroverlay.min.js"></script>
</body>
</html>
```

Script

```js
var blurOverlay = $("#element-id").bluroverlay({
	contentWrapperClass: "content-wrapper-class",
	blur: "10",
	opacity: 0.3,
	background: "#fff"
});
```
> Note: CSS needs to be applied as required to make elements fixed on page. Plugin does NOT apply css `position` tag to make any element `fixed` or `absolute`. Download and run demo for example.

## Options

* __contentWrapperClass__ ['content-wrapper'] - Wrapper classname, entire html wrapped within this class will appear blurred when under overlayed element
* __blur__ ['10'] - Amount of blur to be applied
* __opacity__ [0.4] - Opacity of overlayed element
* __background__ ['#fff'] - CSS background applied to overlayed element

> Values mentioned in [] is default for option.  

## API

* __showBlurModal(elementId)__

  Shows a modal with overlayed element and wrapper elements blurred in background. Pass modal element id in `elementId`.

  Modal HTML

  ```html
  <div id="modal" name="blurred-modal">
	<p>Your modal html here</p>
  </div>
  ```

  Script API

  ```javascript
  blurOverlay.showBlurModal("modal");
  ```

  > Give `name=blurred-modal`. This will hide the modal on init and show it while using this API.

* __hideBlurModal()__

  Hides previously shown modal.

  ```js
  blurOverlay.hideBlurModal();
  ```

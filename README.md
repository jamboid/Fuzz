# Fuzz

Fuzz 3.0 is a HTML/Sass-CSS framework of principles, designed for fast implementation of custom, responsive grid-based websites.

The framework separates presentational concerns into different hierarchical layers. This simplifies the role of each layer and allows a greater proportion of the codebase to be modular and rapidly reusable.

## Major Changes from Fuzz 2.0

* Fuzz 2.0 partially adopted the Block-Element-Modifier approach to creating modular front-end components. Version 3 takes this a step further, combining Fuzz namespacing with a full BEM approach.
* Fuzz 2.0 Components all had an inner container element with a "in" class. This has been removed by default in v3 to better facilitate using Flexbox for layouts. If an inner container is required for a component, it can be added using the Fuzz-BEM naming convention.

## Introduction to Fuzz Namespaces

Fuzz namespaces are signified by a two-letter-plus-underscore prefix attached to a container, component or element's class name.

## Layout Namespaces

One of the principles Fuzz was designed to support was that webpages should be robust first and minimal second.

### Stage - prefix "st_"

* A single instance on a page can be used as a wrapper for complete page

```html
<div class="st_Page">...</div>
```

* Multiple instances can be used to create full-width vertical layers with inner content areas

```html
<header class="st_Header">...</header>
<section class="st_PageContent">...</section>
<footer class="st_Footer">...</footer>
```

### Field - prefix "fd_"

* Used as a wrapper for a top-level horizontal section (e.g. Page Header, Main Content, Page Footer)
* Used as the inner container(s) for a full-width Stage layer

### Region - prefix "rg_"

* Define the general content regions within a Field (e.g. Brand, Main Navigation, Main Column, Sub Column)
* Generally doesn't have margins or paddings set

### Group - prefix "gp_"

* Semantic container for group of repeating components or subcomponents
* Generally doesn't have margins or paddings set

### Component - prefix "cp_"

### Object - prefix "ob_"

Objects are generic sub-components found in multiple Components.

### Grid - prefix "gd_"

The Grid namespace is currently used to create robust grid layouts using the CSS Flexbox module, with fallbacks for legacy browsers. A set of helper classes with the "gd_" prefix are using to implement these layouts.

### Heading - prefix "hd_"

### Text - prefix "tx_"

### Additional Namespaces

## Code Example Scaffolds

```html
<!-- HTML Comment -->
<div class="st_Header">...</div>
<div class="st_PageContent">...</div>
<div class="st_Footer">...</div>
```

```css
/* CSS comment*/
.selector {
  padding:10px;
}
```

```javascript
// JavaScript comment
var newFunction = new function () {
  return false;
}
```


## Author

**Jamie Boyd**

+ http://twitter.com/jamboid
+ http://github.com/jamboid
+ http://jamieboyd.net

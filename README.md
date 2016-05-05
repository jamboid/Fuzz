# Fuzz 3.0

Fuzz 3.0 is a HTML/Sass-CSS framework of principles, designed for fast implementation of custom, responsive grid-based websites.

The framework separates presentational concerns into different hierarchical layers. This simplifies the role of each layer and allows a greater proportion of the codebase to be modular and rapidly reusable.

## Major Changes from Fuzz 2.0

* Fuzz 2.0 partially adopted the Block-Element-Modifier approach to creating modular front-end components. Version 3 takes this a step further, combining Fuzz namespacing with a full BEM approach.
* Fuzz 2.0 Components all had an inner container element with a "in" class. This has been removed by default in v3 to better facilitate using Flexbox for layouts. If an inner container is required for a component, it can be added using the Fuzz-BEM naming convention.

## Introduction to Fuzz Namespaces

Fuzz namespaces are signified by a two-letter-plus-underscore prefix attached to a container, component or element's class name.

## Layout Namespaces

Some or all of these layout levels can be used in a webpage. Beyond fulfilling certain common patterns (e.g. a centrally-aligned content within a full-bleed container) their use is entirely flexible and they only provide options, rather than a rigid set of rules.

### Stage - prefix "st_"

* A single instance can be used as a wrapper for a complete page

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

### Grid - prefix "gd_"

The Grid namespace is currently used to create robust grid layouts using the CSS Flexbox module, with fallbacks for legacy browsers. A set of helper classes with the "gd_" prefix are using to implement these layouts (and avoid repeating the lengthy Flexbox CSS too much).

Unlike the slightly more strict usage for the other layout namespaces above, Grid classes should be added where required: on high-level containers, components, sub-component elements, wherever.

## The Component Namespace - prefix "cp_"

Components are the basic modular unit in Fuzz-HTML documents, with the majority of styles in the CSS being self-contained "Component styles". Styles are applied using the BEM syntax with the outer component class being the Block.

Here's an example of a Carousel Component, illustrating the Block-Element-Modifier syntax and how it relates to the Fuzz Component namespace:

```html
<!-- Base element with "Block" class using Fuzz "cp_" namespace -->
<div class="cp_Carousel">
  <!-- Slides container - Element with class based on Block -->
  <div class="cp_Carousel__slides">

    <!-- Carousel Slide - Element with class based on Block -->
    <div class="cp_Carousel__slide">
      <figure class="cp_Carousel__image" >...</figure>
      <div class="cp_Carousel__slideText">
        <h2 class="cp_Carousel__slideTitle">...</h2>
      </div>
    </div>

    <!-- Carousel Slide - Element with class based on Block -->
    <div class="cp_Carousel__slide">
      <figure class="cp_Carousel__image" >...</figure>
      <div class="cp_Carousel__slideText">
        <h2 class="cp_Carousel__slideTitle">...</h2>
      </div>
    </div>

  </div>

  <!-- Carousel Controls -->
  <div class="cp_Carousel__controls">
    <!-- Carousel Controls - Elements with shared class based on Block, plus Modifier classes -->
    <a href="#" class="cp_Carousel__control--prev cp_Carousel__control">Previous</a>
    <a href="#" class="cp_Carousel__control--next cp_Carousel__control">Next</a>
  </div>
</div>
```

A Component can have multiple "cp_" classes if it is appropriate for it "inherit" from multiple Component types.

## Other Namespaces

### Object - prefix "ob_"

Objects are generic sub-components that can be found in multiple Components. An example would be "ob_Image" added to a container of a responsive image, or "ob_Button" added to an button/input/anchor to create a standard button-type control.

### Heading - prefix "hd_"

The Heading namespace is used to create a set of classes than apply heading typographic styles to elements, with the aim of consolidating typographic styles in one place in the CSS.

### Text - prefix "tx_"

The Text namespace is used to apply sets of typographic styles to the text within a container. The most common use ("tx_Prose") is to apply styles to text created in a CMS rich-text editor.

### Current State - prefix "is_"

The Current State namespace is used to apply state information to an element, the most common example being applying current display state to show and hide components.

### Additional Namespaces

## Sass File Structure and Naming

For each reference

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

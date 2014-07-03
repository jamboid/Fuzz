# Fuzz 2.0

Fuzz 2.0 is a lightweight HTML/Sass-CSS framework designed to provide fast implementation of custom, responsive grid-based websites.

The framework separates presentational concerns into different hierarchical layers. This simplifies the role of each layer and allows a greater proportion of the codebase to be modular and rapidly reusable.

## Hierarchy of Containers

The modular Fuzz hierarchy is (sort of) based on the components of the classical typographic grid.

There are four levels of containers that can be used to create the general layout of the page and a pair of component-level containers that are used to place components precisely within that layout.

The four layout levels, outer to inner, are as follows:

### 1. Stage - prefix "st_"

* A single instance on a page can be used as a wrapper for complete page

```html
<div class="st_Page">...</div>
```

* Multiple instances can be used to create full-width vertical layers with inner content areas

```html
<div class="st_Header">...</div>
<div class="st_PageContent">...</div>
<div class="st_Footer">...</div>
```

### 2. Field - prefix "fd_"

* Used as a wrapper for a top-level horizontal section (e.g. Page Header, Main Content, Page Footer)
* Used as the inner container(s) for a full-width Stage layer

### 3. Region - prefix "rg_"

* Define the general content regions within a Field (e.g. Brand, Main Navigation, Main Column, Sub Column)
* Generally doesn't have margins or paddings set

### 4. Group - prefix "gp_"

* Semantic container for group of repeating components or subcomponents
* Generally doesn't have margins or paddings set

### An example of top level elements

```html
<body>
  <div class="st_Page">
    <header class="fd_PageHeader">
      <div class="rg_Brand">...</div>
      <div class="rg_Nav--main rg_Nav">...</div>
    </header>
    <div class="fd_PageContent">
      <div class="rg_MainContent">...</div>
      <div class="rg_SubContent">
        <div class="gp_RelatedFeatures">...</div>
      </div>
    </div>
    <footer class="fd_PageFooter">
      <div class="rg_Nav--footer rg_Nav">...</div>
    </footer>
  </div>
</body>
```

### Components

All components consist of an outer container, with a **cp_** prefix, which only holds the component in the grid regions, and a single inner container (with a single **in** class), which sets margin, padding and the component's general appearance.

Having these inner and outer containers allows you to separate the component width from the component margins and padding, so components can be styled independently of their context and therefore reused more easily.

#### Outer Component Wrapper - prefix "cp_"

* Wrapper class/container for page component
* Only has an outer width dimension set to place within group, region or field

#### Inner Component Content - class "in"

* Inner container used to set component's padding, margin and appearance independent of overall component width (set on .cp element)
* Block level element
* **Not used a prefix for more specific classes**


## The General Syntax

The Fuzz 2.0 syntax for layout elements is an attempt to create a more useful naming convention for the classes added to Fuzz elements. The basic syntax is as follows:

**.twoletterprefix_NameOfElement--variant-name**

It allows us to do a couple of new things:

### 1. Specify base styles using CSS3 selectors

With Fuzz 1.0 you added a prefix-only class to an element to add basic properties (e.g. "fd" as base class added to each Field element). Fuzz 2.0 removes the need for this extra class by using CSS3 selectors to target the prefix portion of the new class name structure.

For example, we can add basic properties to a navigation Component, **cp_Nav**, by using the CSS selector **[class^="cp_"]**.

### 2. Use the "element-modifier" part of the BEM syntax in Sass

Sass 3.3 adds a shorthand syntax for creating BEM (block-element-modifier) class structures. The block-element relationship is less important in Fuzz, but the **"element-modifier"** relationship is replicated in the **"NameOfElement--variant-name"** portion of the general class syntax.

For example, we have a set of promo components with the basic Component class **"cp_Promo"**, but also a featured promo component that is styled differently. To create this feature promo component we would add the class **"cp_Promo--feature"**. This allows us to write the following Sass code:

```scss
.cp_Promo {
  // base promo styles

  &--feature {
    // feature promo styles
  }
}
```

which will output this CSS:

```scss
.cp_Promo {
  // base promo styles
}

.cp_Promo--feature {
  // feature promo styles
}
```

Unfortunately we need to still use multiple classes for element variants because the "starts with" CSS3 selector trick used to remove the prefix-only class doesn't work with the &-- BEM syntax, but it does produce better organised Sass code and a more consistent naming convention for element variants.

**Note:** If you need to split up the Sass for variants within a file, or across multiple files, don't worry about the empty parent class selectors. These won't compile in the final CSS file and won't produce more anymore CSS than if you had all the **--variant** classes under the one parent selector.

### Multiple Base Classes

It's sometimes useful to break different aspects of an element's presentation into different classes to follow a modular CSS approach, so a Fuzz element can have multiple base classes (and additional variant classes) if required.


## Creating Modular CSS

Any element set at one of these framework levels should have a class with one of the two-letter prefixes added (e.g. All components should have a "cp_"-prefixed class). Variant classes can then be added to allow more specific styling.

For example, a main navigation menu component might have the following HTML:

```html
<nav class="cp_Nav--main cp_Nav">
  <div class="in">
    <ul class="menu">...</ul>
  </div>
</nav>
```

The component has the general "cp_Nav" component class (which inherits the styles provided by the **[class^="cp_"]** selector) and a more specific "cp_Nav--main" class that could be used to provide general list styles for the menu.

The convention for ordering classes on an element is variant classes first, then the more general class.

### Extending the Framework

The 4+2 levels of the Fuzz layout framework should provide enough structure to enable you to build most site layouts, but there may be instances where the presentation requires a more specific or complex system that is best created as something separate, sitting alongside the basic Fuzz levels.

In this situation, create a new two-letter prefix that makes sense and follow all the standard syntax rules.

A real-world example of this would be the flexible grid system used on the [Good website](http://wearegood.com). The grid system was complex enough that it made sense to create a new set of classes to manage it. These classes used a "gd" prefix (it currently uses the older Fuzz 1.0 syntax) and could be applied alongside the Fuzz framework classes at multiple levels.

---

## Modular Styles for Component Elements

Below the level of the Fuzz Component, we still have lots of different HTML elements and groups of elements that need styled in a systematic and rational way.

It's tempting to follow the hierarchy down further and tie component element styles to the Fuzz Component that contains them, along the lines of the BEM system. But at this level we should be thinking in terms of an [Atomic design](http://bradfrostweb.com/blog/post/atomic-web-design/) or other bottom-up system that can be used as a construction kit for building larger components.

Creating a UI kit takes planning and an overall understanding of the site design, so you need to start there. Identify all the elements and sub-components and how their styles can be semantically categorised and sorted. A lot of this depends on the design and your own personal preferences for organising your Sass-CSS. But I would strongly suggest that the classes used to implement this system use the same BEM **element-modifier** relationship used the Fuzz system:

**nameOfElement--variant**

This gives a consistency between the two halts of the overall styling system.

## Author

**Jamie Boyd**

+ http://twitter.com/jamboid
+ http://github.com/jamboid
+ http://jamieboyd.net
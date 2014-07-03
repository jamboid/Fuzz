# Fuzz

Fuzz is a lightweight HTML framework designed to provide fast implementation of custom, responsive grid-based websites.

The framework separates presentational concerns into different hierarchical layers. This simplifies the role of each layer and allows a greater proportion of the codebase to be modular and rapidly reusable.

## Principles

The Framework separates structural concerns into different hierarchical layers. This simplifies the role of each layer and allows a greater proportion of the codebase to be modular and rapidly reusable.

The element at each level is identified by a two-letter prefix added to any classes on that element. The classes should form a modular sequence from specific to general (the two-letter prefix on its own), following the general principles of object-oriented CSS.

## Hierarchy of Containers

The modular hierarchy is (sort of) based on the components of the classical typographic grid.

There are four levels of containers that can be used to create the general layout of the page and a pair of component-level containers that are used to place components precisely within that layout.

The four layout levels, outer to inner, are as follows:

### Stage - prefix "st"

* A single instance on a page can be used as a wrapper for complete page
* Multiple instances can be used to create full-width vertical layers with inner content areas

### Field - prefix "fd"

* Used as a wrapper for a top-level horizontal section (e.g. Page Header, Main Content, Page Footer)
* Used as the inner container(s) for a stretch layer


### Region - prefix "rg"

* Define the general content regions within a Field (e.g. Brand, Main Navigation, Main Column, Sub Column)
* Generally doesn't have margins or paddings set


### Group - prefix "gp"

* Semantic container for group of repeating components or subcomponents
* Generally doesn't have margins or paddings set

### An example of top level elements

```html
<body>
  <div class="stPage st">
    <header class="fdPageHeader fd">
      <div class="rgBrand rg">...</div>
      <div class="rgNavigation rg">...</div>
    </header>
    <div class="fdPageContent fd">
      <div class="rgMainContent rg">...</div>
      <div class="rgSubContent rg">
        <div class="gpRelatedFeatures gp">...</div>
      </div>
    </div>
    <footer class="fdPageFooter rg">
      <div class="rgFooterNav rgNavigation rg">...</div>
    </footer>
  </div>
</body>
```

## Components

All components consist of an outer container (.cp), which only holds the component in the grid regions, and a single inner container (.in), which sets margin, padding and the component's general appearance.

Having these inner and outer containers allows you to separate the component width from the component margins and padding, so components can be styled independently of their context and therefore reused more easily.

### Component - prefix "cp"

* Wrapper class/container for page component
* Only has an outer width dimension set to place within group, region or field


### Inner Component Content - class "in"

* Inner container used to set component's padding, margin and appearance independent of overall component width (set on .cp element)
* Block level element
* **Not used a prefix for more specific classes**

## Creating Modular CSS

Any element set at one of these framework levels should have one of the two-letter prefixes added as a base class (e.g. All components should have a "cp" class). More specific classes can then be added in addition to these to allow more specific styling and selection.

For example, a main navigation menu component might have the following HTML:

```html
<nav class="cpMainNav cpNav cp">
  <div class="in">
    <ul class="menu">...</ul>
  </div>
</nav>
```

The component has the general "cp" component class, a more specific "cpNav" class that could be used to provide general list styles for the menu, and a very specific "cpMainNav" class that can be used to add or override styles for just the main navigation menu.

The convention for ordering classes on an element is specific first, then getting more general and ending with the two-letter framework level class.

## Creating an emergent grid with Fuzz components

**This is a suggestion for how to use Fuzz principles to lay out components in a grid. It's how I do it, and has worked pretty well in at least a dozen client projects, but shouldn't be treated as a required part of the overall framework.**

A typical layout grid for web design consists of a set of columns divided by gutters of space and the traditional approach to creating a web page aligned to such a grid had typically been to do it from the top down. That is, create regions that align to the columns of the grid, then add components within those regions that also align themselves to the column boundaries.

The problem I've found with this, particularly in responsive designs, is the rules for aligning components can get very complex, very quickly. A component that is aligned to the left side of a container in one layout may be aligned to the right side or even sit in the middle of a container as the page resizes. Handling the alignment of such components by adding and removing CSS margins on one side or the other, across multiple layouts, is usually tricky and time-consuming.

Instead, I've found creating components that self-align to the grid is easier and results in a more robust layout.

This is how it works.

All the containers above the component (.cp) level are give widths that include the grid gutters. For example, if a page has a three column layout


## Author

**Jamie Boyd**

+ http://twitter.com/jamboid
+ http://github.com/jamboid
+ http://jamieboyd.net

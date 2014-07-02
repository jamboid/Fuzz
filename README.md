# Fuzz 2.0

Fuzz is a lightweight HTML framework designed to provide fast implementation of custom, responsive grid-based websites.

The framework separates presentational concerns into different hierarchical layers. This simplifies the role of each layer and allows a greater proportion of the codebase to be modular and rapidly reusable.

## Layout Framework

### General Syntax

The Fuzz 2.0 syntax for layout elements is an attempt to create a more useful naming convention for the classes added to Fuzz elements. The basic syntax is as follows:

.prefix_NameOfElement--variant-name

It allows us to do a couple of new things:

#### 1. Remove the "prefix-only" base class

With Fuzz 1.0 you added a prefix-only class to an element to add basic properties (e.g. "fd" as base class added to each Field element). Fuzz 2.0 removes the need for this extra class by using CSS3 selectors to target the prefix portion of the new class name structure.

For example, we can add basic properties to a main navigation Component, **cp_MainNav**, by using the CSS selector **[class^="cp_"]**.

#### 2. Use the "element-modifier" part of the BEM syntax in Sass

Sass 3.3 adds a shorthand syntax for creating BEM (block-element-modifier) class structures. The block-element relationship is less important in Fuzz, but the **element-modifier** relationship is replicated in the **NameOfElement--variant-name** portion of the general class syntax.

For example, we have a set of promo components with the basic Component class "**cp_Promo**", but also a featured promo component that is styled differently. To create this feature promo component we would add the class "**cp_Promo--feature**". This allows us to write the following Sass code:

```sass
.cp_Promo {
	
	// base promo styles

	&--feature {
		// feature promo styles
	}
}
```

which will output the following CSS:

```sass
.cp_Promo {
	// base promo styles
}

.cp_Promo--feature {
	// feature promo styles
}
```

Unfortunately we need to still use multiple classes for element variants because the "starts with" CSS3 selector trick used to remove the prefix-only class doesn't work with the &-- BEM syntax, but it does produce better organised Sass code and a more consistent naming convention for element variants.

### Multiple Base Classes

It's sometimes useful to break different aspects of an element's presentation into different classes, so a Fuzz element can have multiple base classes (and additional variant classes) if required.

## Hierarchy of Containers

The modular Fuzz hierarchy is (sort of) based on the components of the classical typographic grid.

There are four levels of containers that can be used to create the general layout of the page and a pair of component-level containers that are used to place components precisely within that layout.

The four layout levels, outer to inner, are as follows:

### Stage - prefix "st_"

* A single instance on a page can be used as a wrapper for complete page
* Multiple instances can be used to create full-width vertical layers with inner content areas

### Field - prefix "fd_"

* Used as a wrapper for a top-level horizontal section (e.g. Page Header, Main Content, Page Footer)
* Used as the inner container(s) for a stretch layer


### Region - prefix "rg_"

* Define the general content regions within a Field (e.g. Brand, Main Navigation, Main Column, Sub Column)
* Generally doesn't have margins or paddings set


### Group - prefix "gp_"

* Semantic container for group of repeating components or subcomponents
* Generally doesn't have margins or paddings set

### An example of top level elements

```html
<body>
  <div class="st_Page">
    <header class="fd_PageHeader">
      <div class="rg_Brand">...</div>
      <div class="rg_Navigation">...</div>
    </header>
    <div class="fd_PageContent">
      <div class="rg_MainContent">...</div>
      <div class="rg_SubContent">
        <div class="gp_RelatedFeatures">...</div>
      </div>
    </div>
    <footer class="fd_PageFooter">
      <div class="rgNavigation--footer">...</div>
    </footer>
  </div>
</body>
```

## Components

All components consist of an outer container (.cp), which only holds the component in the grid regions, and a single inner container (.in), which sets margin, padding and the component's general appearance.

Having these inner and outer containers allows you to separate the component width from the component margins and padding, so components can be styled independently of their context and therefore reused more easily.

### Component - prefix "cp_"

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
<nav class="cp_Nav--main-nav">
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

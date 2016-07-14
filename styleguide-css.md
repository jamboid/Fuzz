# CSS Coding Styleguide - Fuzz 3.0

## Introduction
This is a guide to correctly formatting Sass-CSS documents.

## Indentation
All code should be be indented to improve readability and highlight nesting/cascade relationships.

Each level of indentation should be **2 spaces**. Ensure that your text editor has this set as the default.

```css
/* Both Selectors and Rules should be indented 2 spaces  */
.topLevelSelector {
  padding:10px;

  &__nested-selector {
    margin-bottom:0;
  }
}
```

## Spacing
Line-spacing should be used in and between code structures to improve readability.

Top-level selectors should be separated by 1 line's space.

```css
.topLevelSelector {
  padding:10px;
}

.anotherTopLevelSelector {
  padding:20px;
}

.thirdTopLevelSelector {
  padding:20px;
}
```

Nested selectors should also be separated by 1 line. However, the first block of rules or selector within the parent selector should not have any space above it.

```css
.topLevelSelector {
  padding:10px; /* First set of rules or sub-selector should not have any space above them */

  &__nested-selector { /* Sub-selectors should have 1 line of space above/below them */
    margin-bottom:0;
  }

  &__another-selector { /* Final sub-selector should have 1 line of space above it */
    margin-bottom:0;
  }  
}
```

## Media Queries
To reduce the size of the final, compiled CSS, nesting media queries inside selectors should be avoided if the media query is used multiple times. For a given Sass file, or subsection within a file, the media queries should be added at the end, in descending size, grouping rules within them.

```css
.topLevelSelector {
  padding:10px;

  &__nested-selector {
    margin-bottom:0;
  }

  &__another-selector {
    margin-bottom:0;
  }  
}

/* !== Related media queries encapsulate groups of rules, rather than being embedded within them  */
@include mq($bpHan) {
  .topLevelSelector {
    padding:5px;

    &__nested-selector {
      margin-bottom:10px;
    }
  }
}
```

## File Names
The CSS for each Fuzz component, object or container should be contained in a separate Sass partial file. The name of the file should be the same as the Fuzz component's base class, after the leading partial underscore. Custom namespace classes for things like text styles (tx_) or grids (gd_) can be collected in a single file

```
|- _cp_MainNav.scss
|- _cp_Dropdown.scss
...
|- _fd_Section.scss
|- _fd_Article.scss
...
|- _gd_Grids.scss
|- _tx_Styles.scss
...
|- _ob_Button.scss
|- _ob_Image.scss
```

If you are using a sibling or other selector that combines two different Fuzz elements, the selector and rules should be included in the files for the element the styles are applied to.

```css
/* This selector should be included in the _fd_Section.scss partial */
.fd_PageHeader {
  + .fd_Section {
    padding-top:0;
    margin:0;
  }
}
```

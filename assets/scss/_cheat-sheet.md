# Sass Cheat Sheet

## Class Prefixes

### Containers

#### .wp	- Page Wrapper

#### .st - Fuzz Stage/Stretch

.stPage

#### .fd - Fuzz Field
#### .rg - Fuzz Region
#### .gp - Fuzz Group
#### .cp - Fuzz Component Shell

.cp-Nav
.cpMainNav
.cp-SubNav__toggle 

<div class="cp-MainNav is-Open">
	<ul class="cp-MainNav__list">
		<li class="cp-MainNav__list-item"></li>
	</ul>
</div>

[class^=cp-] {

}

.cp-MainNav {

	&.is-Open {

	}

	&__list {

	}

	&__list-item {

	}
}



#### .in - Fuzz Component Inner

### Elements

#### .hdg - Heading
	
.hdgAlpha
.hdgBeta
.hdgPage
.hdgSection

#### .lst - List

.list__Clean
.list__NavSlide
.list__NavMain



#### .ttl - Title
#### .act - Action

.actPrimary
.actSecondary

#### .btn - Button
#### .lnk - Link

.lnk
.lnkBack

#### .img - Image
#### .ifr - Iframe
#### .lab - Form Label
#### .fld - Form Field

### Components

#### .csl - Carousel

.cslSlide
.cslContent
.cslInner

#### .shd - Show/Hide
#### .nav - Navigation Menu



### States

#### .is - Current State

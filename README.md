# chippanfire-site

Generation of the (static) chippanfire site

## Why
A super-lightweight "framework" to generate a bunch of static HTML pages that all have a common layout. I wanted to minimise the amount of HTML I had to hand-crank to be just the 'content' of each page.

I'm interested in playing around with (bootstrap powered) responsive web without a 'bulky' framework sitting between me and the raw HTML/CSS

I opted for PHP as it is already installed on my machine (zero setup), and I've used it enough in the past to be wrestle it into submission fairly easily... 

## Setup/Editing
Each page in the site uses a common document, header, navigation and footer.
The layout of the site is configured in build.php.
HTML snippets (stored as .phtml) for each element of a page are stored in src/template

## Build
Use PHP to generate the static html assets by running the following from the top-level folder

```php build.php```

## Deploy
Upload the entire contents of the /site folder to your favourite host and point a DNS record at index.html


## TODO
Page meta tags/titles
Robots.txt
rewrite rules on server e.g.
 - from: http://chippanfire.com/software/m4l-midi-clip-modulo/
 - to: http://chippanfire.com/software-m4l-midi-clip-modulo/
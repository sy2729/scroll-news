# Create news-look scroll bar with data

# Create news-look scroll bar with data

 * First, link to the newsBar JavaScript file;
 * Then, create a new newsBar Element on the page, see the notation below:

```
	let newsBar = new Bar (
		< className | idName | css selector >,   // any identifier used to selector the element on the page to insert the newsBar
		
		< Array >, // the text of the news in an Array format
		//e.g. [{text: 'lorem...'}, {text: 'lorem...'}]
		
		< speed >, // the moving speed of the news, default to 1, readable speed is suggested to be within 3
		...
	
	)
```

Here is a demo: 

```
	let newsBar = new Bar (
		'#news-bar',
		[{text: 'xxx'}, {text: 'xxx'}]	,
		1	
	)
```
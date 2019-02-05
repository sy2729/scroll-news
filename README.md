# Create news-look scroll bar with data

# Create news-look scroll bar with data

 * First, link to the newsBar JavaScript file;
 * Then, create a new newsBar Element on the page, see the notation below:

```
	let newsBar = new Bar (
		id: < String - required> - < className | idName | css selector >,   // any identifier used to selector the element on the page to insert the newsBar
		
		data: < Array - required >, // the text of the news in an Array format
		//e.g. [{text: 'lorem...'}, {text: 'lorem...'}]
		
		speed: < Number > - < speed >, // the moving speed of the news, default to 1, readable speed is suggested to be within 3
		...
	
	)
```

Here is a demo: 

```
	let newsBar = new Bar (
		{
			id: '#news-bar',
			data: [{text: 'xxx'}, {text: 'xxx'}]	
		}
	)
```
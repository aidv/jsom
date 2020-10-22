# JSOM
JSON based markup language

### Background

After building various sites for myself and clients I noticed a pattern and a need to quickly be able to write code that works
without having to debug.

I figured out that HTML is somewhat redundant and kind of useless in todays era.

I found myself using jQuery a lot to create my elements anyways and I figured out that HTML could easily be replaced with a JSON tree.

After thinking about it for a while, I decided to create this tiny library that is very versatile for prototyping, and thus JSOM was born.

### Coding Fashion

You write a tree which contains 3 types: Object, attribute and events.

When defining an element (e.g div) you must also specify a unique identifier using an underscore, as such: `div_X`.
This is because JS object keys have to be unique.

During static markups this is not an issue, and is actually a good practice.

JSOM accepts events definitions within a tree, and events can be specified as a lambda function or referenced from elsewhere.
The `events` keys must be whatever `jQuery.on()` requires.

JSOM also accepts external trees within a tree, so you can reference however you want.


### Example code

```js
var subTree = {
    h3: {text: 'Hello!', events: {click: ()=>{ console.log('"Hello!" clicked') }}},
    input: {type: 'number', value: 1.0, events: {input: function(){ console.log(this.val()) }}}
}


var testTree = {
    div_1: {
        id: 'test',
        class: 'container',
        events: {click: function(){ alert('container clicked') }},
        div: {text: 'Item 1'},
        div: {text: 'Item 2'} 
    },

    button_1: {
        id: 'button',
        text: 'Button',
        events: {click: function(){ alert('button clicked') }},
    },

    div_2: subTree
}


var jsom = new JSOM({root: $('body')})
jsom.parse(testTree)
```


## Support JSOM

Support JSOM by buying me a coffee, starring, contributing, etc...

[Donate using card or PayPal @ BuyMeACoffe](https://www.buymeacoffee.com/splitter)
[Donate on Patreon](https://www.patreon.com/splitter_ai)
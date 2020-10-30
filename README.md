# JSOM

## What is JSOM
JSON based markup language.
It was started as a hobby project.

## What is JSOM NOT
It's meant for quick prototyping.
JSOM is not a replacement for React, Angular, Vue, or any other framework.

## What is JSOM maybe
Maybe it's easy to use. Maybe it's less cluttered that other frameworks. Maybe it's good.


## New in 0.0.6

- Tagged objects now supports ID's with underscores

- Element Bucket. Every element created is stored in a bucket, where the name of the bucket item is named after the ID.

This requires the ID is unique, no matter where in the tree the element is created.

The bucket is returned from `JSOM.parse()`.

Example: 
```js
    var tree = {
        div_myDiv: { class: 'container', events: {click: function(){ alert('container clicked') }},
            div_myDiv: {
                div_subDiv: {
                    div_deepDiv: {}
                }
            }
            div_anotherDiv: {}
        }
    }

    //The _untaggedClassThatWantsDOM value will be the created class itself... or anything that you intentionally return.

    //parse tree
    var bucket = JSOM.parse(tree, parentElement) //parentElement is a DOM element
    
    var myDiv       = bucket.myDiv
    var subDiv      = bucket.subDiv
    var anotherDiv  = bucket.anotherDiv
    var deepDiv     = bucket.deepDiv
    
```


## New in 0.0.5

- Untagged objects now support a callback function. The callback provides the parent element as a parameter
and can return anything of your choice, usually the created class.

This was implemented in order to support classes that accepts DOM's in the constructor.

Example: 
```js
    var tree = {
        div_myDiv: { class: 'container', events: {click: function(){ alert('container clicked') }},
            _untaggedString: 'this can be a string',
            _untaggedObject: {or_an_object: '...',
            _untaggedClass: new MyClass(),
            _untaggedClassThatWantsDOM: (parent) => { return new ClassThatWantsDOM({owner: parent}) }
        }
    }

    //The _untaggedClassThatWantsDOM value will be the created class itself... or anything that you intentionally return.

    //parse tree
    JSOM.parse(tree, parentElement) //parentElement is a DOM element
    
    //myButton is now accessed
    var theClassThatWantsDOM = parentElement.myDiv._untaggedClassThatWantsDOM
```

### New in 0.0.4
- JSOM class is now globally accesed globally just like JSON. No need to declare, create and use.

- Created elements are now stored in parent.

Example:
```js
    var tree = {
        div_myDiv: { class: 'container', events: {click: function(){ alert('container clicked') }},
            button_myButton: { text: 'Button',
                events: {click: function(){ alert('button clicked') }},
            },
        }
    }

    //parse tree
    JSOM.parse(tree, parentElement) //parentElement is a DOM element
    
    //myButton is now accessed
    var theButton = parentElement.myDiv.myButton
```

- Untagged objects. Creating an object with no tag is handled as a key and is added to parent element. This is good when creating classes.

This is done by excluding the tag but still including the underscore and the ID.

Example:
```js
    var tree = {
        div_myDiv: { class: 'container', events: {click: function(){ alert('container clicked') }},
            _myClass: new MyClass()
        }
    }

    //parse tree
    JSOM.parse(tree, parentElement) //parentElement is a DOM element
    
    //myClass is now accessed
    var theClass = parentElement.myDiv.myClass
```

- JSOM warns if an ID has already been used

### New in 0.0.3

- jQuery is no longer needed
- The element unique ID defined in the JSON tree will automatically be used as the ID property for the element.
Example: `div_1` -> `<div id="1"> ...`. No unique id will be ignored completely.

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
The `events` keys must be whatever ~~`jQuery.on()`~~ `Event Listerner` requires, such as `click`, `mouseover`, etc.

JSOM also accepts external trees within a tree, so you can reference however you want.


### Example code

```js
var subTree = {
    h3: {text: 'Hello!', events: {click: ()=>{ console.log('"Hello!" clicked') }}},
    input: {type: 'number', value: 1.0, events: {input: function(){ console.log(this.val()) }}}
}


var testTree = {
    myDiv: {
        id: 'test',
        class: 'container',
        events: {click: function(){ alert('container clicked') }},
        div1: {text: 'Item 1'},
        div2: {text: 'Item 2'} 
    },

    myButon: {
        text: 'Button',
        events: {click: function(){ alert('button clicked') }},
    },

    div_2: subTree
}

JSOM.parse(testTree)
```


## Support JSOM

Support JSOM by buying me a coffee, starring, contributing, etc...

[Donate using card or PayPal @ BuyMeACoffe](https://www.buymeacoffee.com/splitter)

[Donate on Patreon](https://www.patreon.com/splitter_ai)
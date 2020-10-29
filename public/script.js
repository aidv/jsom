var subTree = {
    h3: {text: 'Hello!', events: {click: ()=>{ console.log('"Hello!" clicked') }}},
    input: {type: 'number', value: 1.2, events: {input: function(){ console.log(this.value) }}}
}

var subtwo = {
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
        events: {click: function(){ alert('button clicked') }, mouseover: ()=>{console.log('mouse over')}},
    },

    div_2: subTree
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
        events: {click: function(){ alert('button clicked') }, mouseover: ()=>{console.log('mouse over')}},
    },

    div_2: subTree,

    div: subtwo
}




var jsom = new JSOM({root: document.body})
jsom.parse(testTree)
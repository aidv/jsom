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
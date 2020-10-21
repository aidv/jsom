var testTree = {
    div: {
        id: 'test',
        class: 'container',
        events: {click: function(){ alert('container clicked') }},
        div: {text: 'Item 1'},
        div: {text: 'Item 2'} 
    },

    button: {
        id: 'button',
        text: 'Button',
        events: {click: function(){ alert('button clicked') }},
    }
}


var jsom = new JSOM({root: $('body')})
jsom.parse(testTree)
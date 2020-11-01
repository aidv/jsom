var subTree = {
    h3_header: {text: 'Hello!', events: {click: ()=>{ console.log('"Hello!" clicked') }}},
    input_myInput: {type: 'number', value: 1.2, events: {input: function(){ console.log(this.value) }}}
}

var subtwo = {
    div_d1: { id: 'test', class: 'container', events: {click: function(){ alert('container clicked') }},
        div_d1: {text: 'Item 1'},
        div_d2: {text: 'Item 2'} 
    },

    button_myButton: { id: 'button',
        text: 'Button',
        events: {click: function(){ alert('button clicked') }, mouseover: ()=>{console.log('mouse over')}},
    },

    div_subtree: subTree
}


var testTree = {
    eventsBucket: {
        'myButtonClick': function(){ alert('button clicked from events bucket') }
    },
    
    div_d1: { id: 'test', class: 'container', events: {click: function(){ alert('container clicked') }},
        div_d1: {text: 'Item 1'},
        div_d2: {text: 'Item 2'} 
    },

    button_myButton: { id: 'button',
        text: 'Button',
        events: {myButtonClick: 'click', mouseover: ()=>{console.log('mouse over')}},
    },

    div_subtree: subTree,

    div_subtwo: subtwo
}




JSOM.parse({tree: testTree, root: document.body})
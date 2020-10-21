class JSOM {
    constructor(opt){
        this.root = $('<div></div>').appendTo(opt.root)

        this.otherTypes = ['events', 'id', 'class', 'text', ]

        this.isFunction = value => value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function)
    }

    parse(obj){
        var t = this
        
        function parseEvents(element, events){
            for (var event in events){
                var func = events[event]
                if (t.isFunction(func)){
                    element.unbind(event)
                    element.on(event, func)
                } else {
                    console.error(`${event} is not a function`)
                }
            }
        }
        function parseOther(element, key, value){
            if (key == 'events') return parseEvents(element, value)

            var isFunction = t.isFunction(element[key])
            if (isFunction) return element[key](value)

            element.attr(key, value)
        }

        function parseNode(tree, root){
            for (var key in tree){
                if (key == 'actions') continue

                var value = tree[key]

                if (t.otherTypes.includes(key)){
                    parseOther(root, key, value)
                    continue
                }

                var element = $(`<${key}></${key}>`).appendTo(root)
                parseNode(value, element)
            }
        }

        parseNode(obj, this.root)
    }
}
class JSOM {
    constructor(opt){
        this.root = $('<div></div>').appendTo(opt.root)

        //this.otherTypes = ['events', 'id', 'class', 'text', ] //deprecated

        this.isObject = value => value &&  (Object.prototype.toString.call(value) === "[object Object]" || "object" === typeof value || value instanceof Object)
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

        function parseAttribute(element, key, value){
            var isFunction = t.isFunction(element[key])
            if (isFunction) return element[key](value)

            element.attr(key, value)
        }

        function parseObject(tree, root){
            for (var key in tree){
                if (key == 'actions') continue

                var value = tree[key]

                var isObject = t.isObject(value)
                if (!isObject){
                    parseAttribute(root, key, value)
                    continue
                }

                if (key == 'events'){
                    parseEvents(root, value)
                    continue
                }

                var split = key.split('_')

                var type = split[0]

                var element = $(`<${type}></${type}>`).appendTo(root)
                parseObject(value, element)
            }
        }

        parseObject(obj, this.root)
    }
}
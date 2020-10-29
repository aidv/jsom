class JSOM_ {
    constructor(){
        this.isObject = value => value &&  (Object.prototype.toString.call(value) === "[object Object]" || "object" === typeof value || value instanceof Object)
        this.isFunction = value => value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function)

        this.properties = {
            text: 'textContent',
            html: 'innerHTML'
        }
        this.trySetProperty = (element, value) => {
            //checks if value is a sfull length string or short string version of a predefined element property
            //if it is, it sets the value to the element

            var sanitized = this.properties[value]
            if (!sanitized) sanitized = value
            for (var key in this.properties)
                if (this.properties[key] === sanitized){
                    element[sanitized] = value
                    return true
                }

            return
        }
    }

    parse(obj, root){
        var t = this
        
        function parseEvents(element, events){
            for (var event in events){
                var func = events[event]
                if (t.isFunction(func)){
                    element.addEventListener(event, func)
                } else {
                    console.error(`${event} is not a function`)
                }
            }
        }


        function parseAttribute(element, key, value){
            if (t.trySetProperty(element, key)) return

            if (key === 'id' && document.getElementById(value)) console.warn(`Element with ID has ${value} already been created`)
                
            element.setAttribute(key, value)
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

                var tag = split[0]

                var id_add = (split[1] ? {id: split[1]} : undefined)

                if (tag.length > 0){
                    var element = document.createElement(tag)
                    root.appendChild(element)
                    parseObject({...id_add, ...value}, element)
                    root[id_add.id] = element
                } else {
                    root[id_add.id] = value
                }
            }
        }

        parseObject(obj, root)
    }
}

var JSOM = new JSOM_()
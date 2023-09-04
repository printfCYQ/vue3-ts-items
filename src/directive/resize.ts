import { Directive, DirectiveBinding } from 'vue';

const map = new WeakMap()

const ob = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const handler = map.get(entry.target)
        if (handler) {
            handler(entry)
        }
    }
})

const Resize: Directive = {
    mounted(el:Element, binding: DirectiveBinding) {
        map.set(el, binding.value)
        ob.observe(el)   
    },
    beforeUnmount() {
        
    }
}
export default Resize
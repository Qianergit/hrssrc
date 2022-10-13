// 自定义一个指令

export const imagerror = {
    inserted(dom, options) {
        dom.onerror = function() {
            dom.src = options.value
        }
    }
}
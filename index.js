import LongList from './src/components/longlist'
import _Vue from 'vue'

LongList.install = Vue => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    Vue.component(LongList.name, LongList)
}
export default LongList;
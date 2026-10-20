# Vue

Vue 通过响应式系统追踪状态读取和副作用，组件模板编译为渲染函数。Composition API 让相关状态、计算属性和副作用可以按功能组织。

```ts
import { computed, ref } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

`computed` 用于纯派生值并带缓存；`watch` 适合对变化执行副作用。组件卸载时 Vue 会清理关联的侦听器，外部资源仍应显式关闭。

参考：[Vue 文档](https://vuejs.org/guide/introduction.html)。

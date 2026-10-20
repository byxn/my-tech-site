# React

React 将界面描述为 props 与 state 的函数。渲染阶段计算下一棵 UI 树，提交阶段把变化应用到宿主环境。组件应保持纯渲染，副作用放入事件处理器或 Effect。

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>
}
```

状态应尽量放在真正需要共享它的最近共同父级；派生状态优先在渲染时计算。参考：[React Learn](https://react.dev/learn)。

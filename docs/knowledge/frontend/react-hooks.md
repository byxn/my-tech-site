# React Hooks 与源码分析

Hooks 让函数组件使用状态、副作用、上下文和可复用逻辑。调用顺序必须在每次渲染中一致，因此 Hook 只能在组件或自定义 Hook 顶层调用。

## 阅读线索

1. 从 `useState` 的公开 API 进入状态更新入口。
2. 追踪 Fiber 上 Hook 链表的创建与复用。
3. 区分 render 阶段计算状态和 commit 阶段运行 Effect。
4. 查看更新队列如何处理优先级和重放。

React 内部实现会随版本变化；源码笔记应记录所读 tag 或 commit，避免把某版本实现误当作稳定 API。

延伸阅读：[博客中的依赖数组实践](../../blog/react-hooks-dependency-array)。

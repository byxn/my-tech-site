---
title: React Hooks 依赖数组：从闭包到稳定引用
description: 通过闭包快照、Object.is 比较和稳定引用，理解 useEffect 依赖数组。
date: 2026-10-20
tags: [React, Hooks, JavaScript]
category: 前端
---

# React Hooks 依赖数组：从闭包到稳定引用

## 问题背景

`useEffect` 的常见故障有两类：漏写依赖导致 Effect 读取旧状态；依赖每次变化导致 Effect 反复执行。组件函数每次渲染都会重新运行，每次运行产生一组新的局部变量和函数闭包。

## 解决方案

把 Effect 中读取的响应式值列为依赖。React 在相邻两次提交之间使用 `Object.is` 比较依赖；任意一项不同，Effect 先清理旧副作用，再运行新副作用。

```tsx
import { useEffect, useState } from 'react'

function Search({ query }: { query: string }) {
  const [result, setResult] = useState<string[]>([])
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      setResult(await response.json())
    }
    void load()
    return () => controller.abort()
  }, [query])
  return <Results items={result} />
}
```

依赖是 `query`，因为请求地址由它决定。清理函数在 query 改变或组件卸载时取消旧请求，防止过期结果覆盖新结果。

## 技术细节

依赖数组声明 Effect 闭包使用的响应式值，不是随意控制执行时机的开关。空数组表示没有响应式依赖；开发环境 Strict Mode 可能额外执行一轮 setup 与 cleanup，检查副作用是否对称。

只在 Effect 内使用的对象可在 Effect 内创建，避免每次渲染都产生新引用。函数确实需要跨渲染保持身份时再考虑 `useCallback`；先理清数据流通常更清楚。

## 实践结果

- 请求只因查询词变化而重新发起。
- 旧请求在新请求开始前取消。
- 依赖数组与 Effect 读取的响应式值一致，静态检查可帮助发现遗漏。

## 常见误区

- **把空数组当作生命周期 API。** Effect 是同步外部系统的机制，开发 Strict Mode 还会检查清理逻辑。
- **为了压制 lint 删除依赖。** 这会保留旧闭包；应调整代码结构来表达正确依赖。
- **依赖对象字面量。** `{ page }` 每次渲染都是新引用，`Object.is` 会返回 false。
- **把 `useMemo` 当正确性保证。** 它是性能优化，不能替代对 Effect 数据流的设计。

## 总结

依赖数组记录闭包所需的响应式输入。以数据流设计 Effect，补上对称清理，并只在需要时稳定引用，可以避免陈旧闭包和重复执行。

## 参考资料

- [React：Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React：Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
- [React：useEffect API](https://react.dev/reference/react/useEffect)

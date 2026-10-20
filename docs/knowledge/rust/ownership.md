---
title: Rust 所有权、借用与生命周期
description: 从移动语义、共享借用和可变借用理解 Rust 的编译期内存安全保证。
tags: [Rust, 所有权, 生命周期]
---

# Rust 所有权、借用与生命周期

## 学习目标

- 分清复制与移动，预测值在赋值后的可用性。
- 用借用传递数据而不转移所有权。
- 理解生命周期标注描述引用约束，而非延长数据寿命。

## 核心概念

每个 Rust 值有一个所有者；同一时刻只存在一个所有者。所有者离开作用域时，值被释放。赋值、传参和返回值可能移动所有权；实现 `Copy` 的简单值则按位复制。

引用允许函数临时访问数据而不取得所有权。可以有多个不可变引用，或者一个可变引用；可变引用存在时，不能同时访问其他引用。这在编译期避免数据竞争和迭代器失效等问题。

## 原理解释

```rust
fn byte_count(text: &String) -> usize { text.len() }
fn append_suffix(text: &mut String) { text.push_str("!"); }

fn main() {
    let mut message = String::from("hello");
    let count = byte_count(&message);
    append_suffix(&mut message);
    println!("{message} ({count} bytes)");
}
```

生命周期描述引用有效范围之间的关系。大多数局部关系可由编译器推断；当输入和输出有多种可能对应关系时，显式标注帮助检查调用方的用法。

```rust
fn longer<'a>(left: &'a str, right: &'a str) -> &'a str {
    if left.len() >= right.len() { left } else { right }
}
```

`'a` 不会让引用活得更久，而是要求返回引用不超过两个输入都有效的范围。

## 实际应用

- 接受 `&str` 而不是 `&String`，可同时接收字符串切片和 `String` 的借用。
- 对只读数据优先共享借用，需要修改时再使用可变借用。
- 用 `Option<&T>` 表达可选借用，避免不必要的克隆。
- 异步任务间转移数据时明确所有权，常见做法是 `async move`。

## 常见误区

- **借用等于复制。** 借用只提供访问权限，不复制数据也不转移所有权。
- **生命周期标注会延长变量寿命。** 它只描述约束，不满足约束的代码仍然无法编译。
- **遇到借用错误就克隆。** 先考虑函数是否可以改为借用、所有权是否应由调用者提供。
- **`String` 和 `&str` 可随意互换。** 前者拥有可变缓冲区，后者是字符串视图。

## 尚未解决的问题

- 自引用结构如何借助 `Pin` 安全建模？
- `Arc<Mutex<T>>` 的共享所有权与借用规则怎样配合？

## 参考资料

- [Rust Book：Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
- [Rust Book：Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

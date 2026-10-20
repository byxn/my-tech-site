# Trait 与泛型

Trait 定义一组方法契约。泛型函数可用 `T: Trait` 接受实现了该契约的类型。编译器通常在编译期单态化静态分发；`dyn Trait` 通过 trait object 执行运行时动态分发。

```rust
use std::fmt::Display;

fn describe<T: Display>(value: T) -> String {
    format!("value = {value}")
}
```

多个约束可用 `where` 子句排版。选择泛型还是 trait object 时，考虑调用方是否需要异构集合，以及是否需要运行时选择实现。Trait 是行为契约，不是类继承。

参考：[Rust Book：Traits](https://doc.rust-lang.org/book/ch10-02-traits.html)。

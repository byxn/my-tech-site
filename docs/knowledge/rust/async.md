# Rust 异步编程

`async fn` 调用后返回实现 `Future` 的惰性状态机。Future 被轮询时运行到等待点；资源未就绪就返回 `Pending`，并通过 `Waker` 通知执行器稍后再轮询。语言本身不提供网络 I/O 或线程池，具体能力由 Tokio 等运行时提供。

```rust
async fn fetch_pair() -> (String, String) {
    let (left, right) = tokio::join!(fetch("/left"), fetch("/right"));
    (left, right)
}
```

`join!` 并发驱动两个 Future，但不自动把它们放到不同线程。CPU 密集工作应安排到阻塞线程池。为 I/O 设定超时和取消边界，不要在异步任务里执行长时间同步阻塞。

常见误区：`async` 不等于自动并行；`.await` 不创建线程，它让当前任务在等待期间让出执行权。

参考：[Rust Async Book](https://rust-lang.github.io/async-book/)、[Tokio Tutorial](https://tokio.rs/tokio/tutorial)。

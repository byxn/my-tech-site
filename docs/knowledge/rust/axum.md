# Axum

Axum 基于 Tower 服务抽象和 Tokio 生态构建 HTTP 应用。路由负责匹配路径，提取器将请求解析成类型化参数，处理器返回响应类型。

```rust
use axum::{routing::get, Router};

async fn health() -> &'static str { "ok" }
let app = Router::new().route("/health", get(health));
```

将共享状态通过 `State<T>` 注入处理器；用 `Result<impl IntoResponse, AppError>` 明确错误到 HTTP 响应的映射。中间件可复用超时、日志和认证逻辑。

继续学习：[Axum 官方文档](https://docs.rs/axum/latest/axum/)。

use axum::{routing::get, Router};
use consul_utils::run_microservice;

const PORT: u32 = 3333;
const ADDR: &str = "127.0.0.1";

#[tokio::main]
async fn main() {
    let router = Router::new()
        .route(
            "/api/v1",
            get(|| async move { format!("Service Port: {PORT}") }),
        )
        .route("/api/v1/about", get(|| async move { "This is about page" }));

    run_microservice("auth_service", ADDR, PORT, router).await;
}

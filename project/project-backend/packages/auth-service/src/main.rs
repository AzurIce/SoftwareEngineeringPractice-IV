mod handlers;

use auth_service::{entities::{prelude::*, sea_orm_active_enums::{RoleEnum, RoleEnumVariant}, *}, migration::Migrator};

use axum::{routing::{get, post}, Router};
use consul_utils::run_microservice;
use sea_orm::{ActiveValue, Database, DatabaseConnection, EntityTrait};
use sea_orm_migration::MigratorTrait;

const PORT: u32 = 3333;
const ADDR: &str = "127.0.0.1";

#[derive(Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[tokio::main]
async fn main() {
    let conn: DatabaseConnection = Database::connect("postgres://azurice:@127.0.0.1:5432/mydb")
        .await
        .expect("failed to connect to database");

    Migrator::up(&conn, None).await.expect("failed to migrate database");

    // No admin, init
    if User::find_by_id(0).one(&conn).await.unwrap().is_none() {
        let init_admin = user::ActiveModel {
            id: ActiveValue::set(0),
            username: ActiveValue::set("admin".to_string()),
            password: ActiveValue::set("admin".to_string()),
            role: ActiveValue::set(RoleEnum::Admin),
            ..Default::default()
        };
        User::insert(init_admin).exec(&conn).await.expect("failed to create initial admin account");
    }

    let state = AppState { conn };

    let router = Router::new()
        .route("/api/v1/login", post(handlers::login))
        .route(
            "/api/v1",
            get(|| async move { format!("Service Port: {PORT}") }),
        )
        .route("/api/v1/about", get(|| async move { "This is about page" }))
        .with_state(state);

    run_microservice("auth_service", ADDR, PORT, router).await;
}

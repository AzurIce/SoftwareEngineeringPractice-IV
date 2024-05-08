use axum::{error_handling, extract::State, http::StatusCode, response::IntoResponse, Json};
use consul_utils::ApiError;
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};
use serde::Deserialize;

use crate::AppState;

use auth_service::entities::{prelude::*, *};

#[derive(Deserialize)]
struct UserLogin {
    username: String,
    password: String,
}

#[axum::debug_handler]
pub async fn login(
    Json(data): Json<UserLogin>,
    State(state): State<AppState>,
) -> Result<String, ApiError> {
    let db = &state.conn;

    let user = User::find()
        .filter(user::Column::Username.eq(data.username))
        .one(db)
        .await
        .map_err(|err| ApiError {
            msg: format!("{err}"),
            status_code: StatusCode::BAD_GATEWAY,
            error_code: None,
        })?
        .ok_or(ApiError {
            msg: "user not exist".to_string(),
            status_code: StatusCode::BAD_GATEWAY,
            error_code: None,
        })?;

    if user.password == data.password {
        Ok("ok".to_string())
    } else {
        Err(ApiError {
            msg: "username or password not correct".to_string(),
            status_code: StatusCode::BAD_REQUEST,
            error_code: None,
        })
    }
}

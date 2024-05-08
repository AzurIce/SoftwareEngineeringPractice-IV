use axum::{routing::get, Router};
use consulrs::{
    api::{check::common::AgentServiceCheckBuilder, service::requests::RegisterServiceRequest},
    client::{ConsulClient, ConsulClientSettingsBuilder},
    error::ClientError,
    service,
};

const CONSUL_ENDPOINT: &str = "http://127.0.0.1:8500";

pub async fn run_microservice(name: &str, addr: &str, port: u32, router: Router) {
    let router = router.route("/health", get(|| async move { "good" }));

    register_service(name, addr, port)
        .await
        .expect("failed to register service");

    axum::Server::bind(&format!("0.0.0.0:{}", port).parse().unwrap())
        .serve(router.into_make_service())
        .await
        .unwrap();
}

/// Register a service into consul
/// the name of the service will be [`name`]
/// the location of the service will be [`addr`] and [`port`]
pub async fn register_service(name: &str, addr: &str, port: u32) -> Result<(), ClientError> {
    // Create a client
    let client = ConsulClient::new(
        ConsulClientSettingsBuilder::default()
            .address(CONSUL_ENDPOINT)
            .build()
            .unwrap(),
    )
    .unwrap();

    // Create a service named "my_service" with a health check that queries the
    // service via HTTP every 10 seconds.
    service::register(
        &client,
        name,
        Some(
            RegisterServiceRequest::builder()
                .id(format!("{name}-{}", port))
                .name(format!("{name}-{}", port))
                .address(addr)
                .port(port)
                .check(
                    AgentServiceCheckBuilder::default()
                        .name("health_check")
                        .interval("10s")
                        .http(format!("http://{addr}:{port}/health"))
                        .status("passing")
                        .build()
                        .unwrap(),
                ),
        ),
    )
    .await?;

    Ok(())
}

package com.azurice.practice4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class Practice4Application {

    public static void main(String[] args) {
        SpringApplication.run(Practice4Application.class, args);
    }

}

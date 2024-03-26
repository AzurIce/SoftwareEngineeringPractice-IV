package com.azurice.practice3;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages={"com.azurice.practice3.repository"})
public class Practice3Application {

	public static void main(String[] args) {
		SpringApplication.run(Practice3Application.class, args);
	}

}

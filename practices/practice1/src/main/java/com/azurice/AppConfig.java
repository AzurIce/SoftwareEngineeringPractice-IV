package com.azurice;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class AppConfig {

//    @Bean
//    public MyService myService() {
//        return new MyService();
//    }


    @Bean("s1")
    public MyService s1() {
        return new MyService("s1");
    }

    @Bean("s2")
    public MyService s2() {
        return new MyService("s2");
    }

    @Bean
    public DruidDataSource druidDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306?characterEncoding=utf-8");
        dataSource.setUsername("root");
//        dataSource.setPassword("root");

        return dataSource;
    }
}
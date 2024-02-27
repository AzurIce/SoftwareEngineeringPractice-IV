package com.azurice;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);

        MyService myService = ctx.getBean(MyService.class);

        System.out.println(myService);
        myService.hello();
    }
}
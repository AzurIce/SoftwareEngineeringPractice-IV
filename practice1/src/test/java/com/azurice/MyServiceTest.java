package com.azurice;

import com.alibaba.druid.pool.DruidDataSource;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MyServiceTest {
    static AnnotationConfigApplicationContext ctx;
    @BeforeAll
    public static void init() {
        ctx = new AnnotationConfigApplicationContext(AppConfig.class);
    }

    @AfterAll
    public static void destroy() {
        ctx.close();
    }

    @Test
    void testHello() {
        MyService myService = ctx.getBean(MyService.class);
        System.out.println(myService);
        assertEquals("Hello", myService.hello());
    }

    @Test
    void testHelloFailed() {
        MyService myService = ctx.getBean(MyService.class);
        System.out.println(myService);
        assertEquals("?", myService.hello());
    }

    @Test
    void testDruidDataSource() {
        DruidDataSource druidDataSource = ctx.getBean(DruidDataSource.class);
        System.out.println(druidDataSource);
        try {
            var meta = druidDataSource.getConnection().getMetaData();
            System.out.println(meta);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void testDI() {
        Person person = ctx.getBean(Person.class);
        System.out.println(person);
        person.write();
    }
}

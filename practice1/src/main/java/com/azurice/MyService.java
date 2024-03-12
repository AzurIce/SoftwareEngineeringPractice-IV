package com.azurice;

public class MyService {
    String name;
    MyService() {
        this.name = "1";
    }

    MyService(String name) {
        this.name = name;
    }

    public String hello() {
        return "Hello";
    }
}

package com.azurice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
public class Person {
    String name = "default person";

    @Autowired
    Pen pen;

    void write() {
        System.out.println(name + " use " + pen.name + " to write");
    }
}

@Component
class Pen {
    String name = "default pen";
}
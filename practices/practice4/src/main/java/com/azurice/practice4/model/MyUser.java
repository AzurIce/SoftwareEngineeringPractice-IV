package com.azurice.practice4.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class MyUser {
    private int id;
    private String username;
    private String password;
}


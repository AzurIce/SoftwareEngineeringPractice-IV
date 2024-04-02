package com.azurice.practice3.repository;

import com.azurice.practice3.model.MyUser;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyUserRepository {
    List<MyUser> findAll();
    void save(MyUser user);
    int delete(int id);
    MyUser findUserById(int id);
    MyUser findUserByUsername(String username);
    int update(MyUser user);
}

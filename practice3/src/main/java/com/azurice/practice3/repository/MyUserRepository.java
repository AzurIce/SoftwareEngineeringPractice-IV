package com.azurice.practice3.repository;

import com.azurice.practice3.model.MyUser;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyUserRepository {
    List<MyUser> findAll();
    void save(MyUser user);
    int delete(int id);
    MyUser findUserById(int id);
    int update(MyUser user);
}

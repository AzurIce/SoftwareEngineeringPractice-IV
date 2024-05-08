package com.azurice.practice4.repository;

import com.azurice.practice4.model.MyUser;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyUserRepository {
    List<MyUser> findAll();
    void save(MyUser user);
    int delete(int id);
    MyUser findUserById(int id);
    MyUser findUserByUsername(String username);
    int update(MyUser user);
}

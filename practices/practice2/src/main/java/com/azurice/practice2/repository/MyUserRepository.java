package com.azurice.practice2.repository;

import com.azurice.practice2.model.MyUser;
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

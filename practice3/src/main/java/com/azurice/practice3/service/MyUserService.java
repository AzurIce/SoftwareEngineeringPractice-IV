package com.azurice.practice3.service;

import com.azurice.practice3.model.MyUser;

import java.util.List;

public interface MyUserService {
    List<MyUser> findAll();
    void save(MyUser user);

    /*
     * 根据id删除用户
     */
    int delete(Integer id);

    /*
     * 根据id查找用户
     */
    MyUser findUserById(int id);

    /*
     * 更改用户信息
     */
    int update(MyUser user);
}


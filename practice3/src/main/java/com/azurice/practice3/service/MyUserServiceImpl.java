package com.azurice.practice3.service;

import com.azurice.practice3.model.MyUser;
import com.azurice.practice3.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyUserServiceImpl implements MyUserService{
    @Autowired
    private MyUserRepository myUserRepository;

    @Override
    public List<MyUser> findAll() {
        return myUserRepository.findAll();
    }

    public void save(MyUser user) {
        myUserRepository.save(user);
    }

    public int delete(Integer id) {
        return myUserRepository.delete(id);
    }

    public MyUser findUserById(int id) {
        return myUserRepository.findUserById(id);
    }

    public int update(MyUser user) {
        return myUserRepository.update(user);
    }
}

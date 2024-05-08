package com.azurice.loginservice.service;

import com.azurice.loginservice.model.MyUser;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MyUserService {
    private static final Map<Integer, MyUser> userDatabase;

    static {
        userDatabase = new HashMap<>();
        userDatabase.put(0, new MyUser(0, "user0", "password0"));
        userDatabase.put(1, new MyUser(1, "user1", "password1"));
    }

    public List<MyUser> findAll() {
        return userDatabase.values().stream().collect(Collectors.toList());
    }

//    public void save(MyUser user) {
//        myUserRepository.save(user);
//    }
//
//    public int delete(Integer id) {
//        return myUserRepository.delete(id);
//    }

    public MyUser findUserById(@PathVariable("id") int id) {
        return userDatabase.get(id);
    }

    public MyUser findUserByName(String username) {
        return userDatabase.values().stream().filter(user -> user.getUsername().equals(username)).findFirst().get();
    }
//
//    public int update(MyUser user) {
//        return myUserRepository.update(user);
//    }
}

package com.azurice.practice4.controller;

import com.azurice.practice4.model.MyUser;
import com.azurice.practice4.service.MyUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MyUserController {
    @Autowired
    private MyUserService myUserService;

    //    @ResponseBody
    @CrossOrigin(origins = "*")
    @GetMapping("/user")
    public List<MyUser> getUsers(){
        return myUserService.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/user")
    public void createUser(@RequestBody MyUser user) {
        myUserService.save(user);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public boolean login(@RequestBody MyUser user) {
        MyUser dbu = myUserService.findUserByName(user.getUsername());
        return dbu.getPassword().equals(user.getPassword());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/user/{id}")
    public MyUser getUserById(@PathVariable int id) {
        return myUserService.findUserById(id);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/user/{id}")
    public int deleteUserById(@PathVariable int id) {
        return myUserService.delete(id);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/user/{id}")
    public void updateUserById(@RequestBody MyUser user, @PathVariable int id) {
        System.out.println(user.getPassword());
        System.out.println(user.getUsername());
        user.setId(id);
        myUserService.update(user);
    }

}

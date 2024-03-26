package com.azurice.practice2.controller;

import com.azurice.practice2.model.MyUser;
import com.azurice.practice2.service.MyUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MyUserController {
    @Autowired
    private MyUserService myUserService;

    @ResponseBody
    @RequestMapping("/findAll")
    public List<MyUser> findAll(){
        System.out.println("findAll");
        return myUserService.findAll();
    }

    @RequestMapping("/insertPage")
    public String index() {
        return "insertPage";
    }

    @RequestMapping("select/{id}")
    @ResponseBody
    public String findUserById(@PathVariable int id) {
        return myUserService.findUserById(id).toString();
    }

    @RequestMapping("/userList")
    public String userList(Model model) {
        List<MyUser> users = myUserService.findAll();
        model.addAttribute("users", users);
        return "userList";
    }

    @RequestMapping("/insert")
    public String save(MyUser user) {
        myUserService.save(user);
        return "redirect:/userList";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        myUserService.delete(id);
        return "redirect:/userList";
    }

    @GetMapping("/updatePage/{id}")
    public String updatePage(Model model, @PathVariable int id) {
        MyUser user = myUserService.findUserById(id);
        model.addAttribute("user", user);
        return "updatePage";
    }

    @PostMapping("/update")
    public String updateUser(Model model, MyUser user, HttpServletRequest request) {
        String id = request.getParameter("id");
        MyUser userById = myUserService.findUserById(Integer.parseInt(id));
        user.setId(Integer.parseInt(id));
        myUserService.update(user);
        return "redirect:/userList";
    }
}

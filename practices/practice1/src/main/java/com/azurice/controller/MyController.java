package com.azurice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
public class MyController {
    @GetMapping("/")
    @ResponseBody
    public String handle() {
        return "Bjava";
    }

    @GetMapping("/show")
    public ModelAndView show() {
        return new ModelAndView("demo");
    }

    @GetMapping("/message")
    public ModelAndView msg() {
        ModelAndView mv = new ModelAndView("msg");
        mv.addObject("message", "BBBBBBjava");
        return mv;
    }

    @GetMapping("/message2")
    public String msg2(Model model) {
        model.addAttribute("message", "javaBBBBBBB");
        return "msg";
    }
}

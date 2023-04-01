package com.qf.firstdemo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
//@RequestMapping("/test")
public class JspController {

   @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(Model model){
       model.addAttribute("name","张三");
       System.out.println("进入index的接口");
       return "index";
   }
}

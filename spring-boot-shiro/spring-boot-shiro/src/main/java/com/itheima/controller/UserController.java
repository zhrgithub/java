package com.itheima.controller;

import com.itheima.domain.User;
import com.itheima.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    @ResponseBody
    public String index(){
        return "欢迎11！";
    }


    @RequestMapping(value = "/testThymeleaf",method = RequestMethod.GET)
    public String testThymeleaf(Model model){
        model.addAttribute("name","北冥科技");
        return "test";
    }
    @RequestMapping("/add")
    public String add(){
        return "/user/add";
    }
    @RequestMapping("/edit")
    public String edit(){
        return "/user/edit";
    }
    @RequestMapping("/findByName")
    @ResponseBody
    public User findByName(String name){
        System.out.println(userService.findByName(name));
        return userService.findByName(name);
    }
    @RequestMapping("/toLogin")
    public String toLogin(){
        return "/toLogin";
    }
    @RequestMapping("/unAuth")
    public String unAuth(){
        return "/unAuth";
    }

    @RequestMapping("/login")
    public String login(String name,String password,Model model){
        System.out.println("name="+name);
        /**
         * 使用Shiro编写认证操作
         */
        //1.获取Subject
        Subject subject = SecurityUtils.getSubject();

        //2.封装数据源
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(name,password);

        //3.执行登录方法
        try {
            subject.login(usernamePasswordToken);
            //登录成功
            return "redirect:/testThymeleaf";
        }catch (UnknownAccountException e){
            model.addAttribute("msg","用户名不存在");
//            return "redirect:/toLogin";
            return "toLogin";
        }catch (IncorrectCredentialsException e){
            model.addAttribute("msg","密码不正确");
//            return "redirect:/toLogin";
            return "toLogin";
        }


    }

}

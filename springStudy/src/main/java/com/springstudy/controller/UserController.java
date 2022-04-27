package com.springstudy.controller;

import com.springstudy.aop.UserAccess;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 14:44
 */
@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping("login")
    public String login() {
        return "登录成功！！！";
    }

    @PostMapping("remove")
    @UserAccess(desc = "666")
    public String remove(String userId,String name) {
        return "删除成功";
    }


}

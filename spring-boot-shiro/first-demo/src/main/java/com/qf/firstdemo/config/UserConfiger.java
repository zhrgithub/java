package com.qf.firstdemo.config;

import com.qf.firstdemo.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfiger {
    @Bean(name = "user1")
    public User user(){
        User user = new User();
        user.setId(12);
        user.setName("张三");
        return user;
    }

}

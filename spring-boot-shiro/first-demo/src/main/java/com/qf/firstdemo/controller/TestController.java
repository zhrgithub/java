package com.qf.firstdemo.controller;

import com.qf.firstdemo.pojo.User;

import com.qf.firstdemo.properties.AliyunProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class TestController {

    /**
     * 此处的注解是@Resource,如果不写name，那么默认是方法名字
     * 注解还可以使用@Autowired
     */
    @Resource(name = "user1")
    private User user;



    @GetMapping("/test")
    public String test(){
        return "运行成功";
    }

    /**
     * 返回bean中初始化后的user对象
     * @return
     */
    @GetMapping("/user")
    public User user(){
        return user;
    }

    @Value("${picPath}")
    private String pic;

    @GetMapping("picPath")
    public String picPath(){
        return pic;
    }


    @Autowired
    private AliyunProperties aliyun;

    @GetMapping("/aliyun")
    public AliyunProperties aliyun(){
        return aliyun;
    }
}

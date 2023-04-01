package com.qf.firstdemo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * 1.@SpringBootApplication是一个组合的configeration,集成了前端控制器的扫描和映射关系
 *2.@MapperScan用于扫描mapper所在的包
 */
@SpringBootApplication
@MapperScan(basePackages = "com.qf.firstdemo.mapper")
public class FirstDemoApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(FirstDemoApplication.class, args);
    }

}

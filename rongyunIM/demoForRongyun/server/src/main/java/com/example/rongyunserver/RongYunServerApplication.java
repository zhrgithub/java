package com.example.rongyunserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.rongyunserver.mapper")
public class RongYunServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(RongYunServerApplication.class, args);
    }

}

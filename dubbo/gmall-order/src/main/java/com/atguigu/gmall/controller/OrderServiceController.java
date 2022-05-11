package com.atguigu.gmall.controller;

import com.atguigu.gmall.bean.UserAddress;
import com.atguigu.gmall.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author zhr_java@163.com
 * @date 2022/5/11 19:43
 */
@RestController
@RequestMapping("order")
public class OrderServiceController {

    @Autowired
    OrderService orderService;

    @GetMapping("iniOrder")
    public List<UserAddress> initOrder(String userId){
        return orderService.initOrder(userId);
    }
}

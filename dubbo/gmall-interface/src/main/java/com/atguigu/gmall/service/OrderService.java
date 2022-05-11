package com.atguigu.gmall.service;

import com.atguigu.gmall.bean.UserAddress;

import java.util.List;

/**
 * @author zhr_java@163.com
 * @date 2022/5/11 13:19
 */
public interface OrderService {

    public List<UserAddress> initOrder(String userId);

}

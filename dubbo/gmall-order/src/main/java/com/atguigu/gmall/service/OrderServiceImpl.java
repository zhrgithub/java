package com.atguigu.gmall.service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.atguigu.gmall.bean.UserAddress;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zhr_java@163.com
 * @date 2022/5/11 13:23
 */
@Service
public class OrderServiceImpl implements OrderService {

  @Reference
  UserService userService;

  @Override
  public List<UserAddress> initOrder(String userId) {
    List<UserAddress> list = userService.getUserAddressList(userId);
    System.out.println("远程调用结果："+list);
    return list;
  }
}

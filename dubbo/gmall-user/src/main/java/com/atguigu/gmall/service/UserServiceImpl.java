package com.atguigu.gmall.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.atguigu.gmall.bean.UserAddress;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author zhr_java@163.com
 * @date 2022/5/11 13:25
 */
@Service // 使用的是dubbo的service注解，目的是暴露服务
@Component
public class UserServiceImpl implements UserService {

  @Override
  public List<UserAddress> getUserAddressList(String userId) {

    List<UserAddress> list = new ArrayList<>();
    UserAddress userAddress = new UserAddress("河北邯郸", "001", "13323", "张三");
    UserAddress userAddressTwo = new UserAddress("广东深圳", "002", "122", "王五");
    list.add(userAddress);
    list.add(userAddressTwo);

    System.out.println("调用第 一 个提供者的服务！！！");
    return list.stream().filter(x -> x.getUserId().equals(userId)).collect(Collectors.toList());
  }
}

package com.atguigu.gmall.service;

import com.atguigu.gmall.bean.UserAddress;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zhr_java@163.com
 * @date 2022/5/11 10:23
 */
public interface UserService {

  public List<UserAddress> getUserAddressList(String userId);


}

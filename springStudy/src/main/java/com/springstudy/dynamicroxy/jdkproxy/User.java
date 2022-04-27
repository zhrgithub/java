package com.springstudy.dynamicroxy.jdkproxy;

import lombok.Data;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:17
 */
@Data
public class User implements UserService {

  String id = "120";
  String name = "张三";
  String money = "100";

  @Override
  public String getUser() {
    return toString();
  }
}

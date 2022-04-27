package com.springstudy.dynamicroxy.jdkproxy;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:33
 */
public class Test {

  public static void main(String[] args) {
    //测试JDK动态代理
      User user = new User();
      JDKInvokerHandler jdk = new JDKInvokerHandler(user);
      UserService users = (UserService) jdk.getProxy();
      users.getUser();
  }
}

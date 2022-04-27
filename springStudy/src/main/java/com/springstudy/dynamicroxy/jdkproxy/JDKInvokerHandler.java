package com.springstudy.dynamicroxy.jdkproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:18
 */
public class JDKInvokerHandler implements InvocationHandler {
  User user;

  public JDKInvokerHandler(User user) {
    this.user = user;
  }

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) {

    try {
      System.out.println("代理之前！！！" + user.toString()+"  args:"+args);
      if (user.getId().equals("120")) {
        System.out.println("系统检测是张三，拦住张三交完保护费然后放行");
        user.setMoney("10");
      }
      // 真正的代理对象
      Object object = method.invoke(user, args);

      System.out.println("代理之后！！！" + user.toString());
      return object;
    } catch (Throwable e) {
      System.out.println("代理失败！！！");
      return null;
    }
  }

  public Object getProxy() {
    return Proxy.newProxyInstance(
        user.getClass().getClassLoader(), user.getClass().getInterfaces(), this);
  }
}

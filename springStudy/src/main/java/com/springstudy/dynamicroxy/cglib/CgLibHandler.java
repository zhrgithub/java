package com.springstudy.dynamicroxy.cglib;

import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:44
 */
public class CgLibHandler implements MethodInterceptor {
  Object object = null;
  @Override
  public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) {

    try {
      System.out.println("代理之前" + o.getClass().getName());

      // 真正的被代理对象
      object = methodProxy.invokeSuper(o, objects);

      System.out.println("代理之后" + o.getClass().toString());

      return object;
    } catch (Throwable ex) {
      System.out.println("代理失败");
      return null;
    }
  }

  public Object getProxy(Class clazz) {
    Enhancer enhancer = new Enhancer();
    enhancer.setSuperclass(clazz);
    enhancer.setCallback(this);
    return enhancer.create();
  }
}

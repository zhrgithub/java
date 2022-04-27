package com.springstudy.dynamicroxy.cglib;

import lombok.Data;

import java.lang.invoke.MethodHandle;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:13
 */
@Data
public class Person {

  String name = "李四";
  String sex = "女";

  public void operation() {
    this.name = "王五";
    System.out.println("李四改名叫王五");
  }
}

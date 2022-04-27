package com.springstudy.dynamicroxy.cglib;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:56
 */
public class Test {
  public static void main(String[] args) {
    //
    CgLibHandler cgLibHandler = new CgLibHandler();
    Person person = (Person) cgLibHandler.getProxy(Person.class);

    System.out.println("操作之前"+person);
    person.operation();
    System.out.println("操作之后"+person);
  }
}

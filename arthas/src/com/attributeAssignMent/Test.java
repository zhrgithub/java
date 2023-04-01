package com.attributeAssignMent;

/**
 * @author zhr_java@163.com
 * @date 2022/4/9 17:33
 */
public class Test {
  public static void main(String[] args) {
    //测试单级赋值
      String jsonString = "name:李明,higher:12,age:32,date:2022-04-09 10-20-21,home.room.size:12,home.address:河北省邯郸市";
      Person person = ClassInstanceFactory.create(Person.class,jsonString);
    System.out.println(person.toString());
  }
}

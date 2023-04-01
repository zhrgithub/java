package com.multyThread;

import java.util.concurrent.locks.ReentrantLock;

public class Product {
  private Integer number = 10;
  ReentrantLock lock = new ReentrantLock();

  public Product() {}

  public void reduce() {
    try {
      lock.lock();
      if (number > 0) {
        System.out.println("剩余资源：" + number);
        number--;

      } else {
        System.out.println("剩余资源为" + number + "，资源短缺");
      }

    } catch (Exception e) {

    } finally {
      lock.unlock();
    }
  }
}

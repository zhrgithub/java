package com.attributeAssignMent;

/**
 * @author zhr_java@163.com
 * @date 2022/4/10 17:40
 */
public class Room {
  private String size;

  @Override
  public String toString() {

    return "Room{" +
            "size='" + size + '\'' +
            '}';
  }

  public String getSize() {

    return size;
  }

  public void setSize(String size) {

    this.size = size;
  }

}

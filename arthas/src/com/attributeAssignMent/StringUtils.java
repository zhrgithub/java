package com.attributeAssignMent;

/**
 * @author zhr_java@163.com
 * @date 2022/4/9 17:03
 */
public class StringUtils {

  public static String initcap(String string) {
    if (string.equals("") || string == null) {
      return string;
    }
    if (string.length() == 1) {
      return string.toUpperCase();
    } else {
      return string.substring(0, 1).toUpperCase() + string.substring(1);
    }
  }
}

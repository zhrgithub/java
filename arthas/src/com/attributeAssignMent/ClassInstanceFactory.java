package com.attributeAssignMent;

/**
 * @author zhr_java@163.com
 * @date 2022/4/9 17:20
 */
public class ClassInstanceFactory {

  public ClassInstanceFactory() {}

  /**
   * 实例化对象的创建方法：该对象可以根据传入的字符串结构"属性：内容，属性：内容"
   *
   * @param clazz 要被赋值的目标对象
   * @param value 目标对象被赋的值
   * @param <T> 所有类型对象
   * @return 已经被赋值后的目标对象
   */
  public static <T> T create(Class<?> clazz, String value) {
    try {
      // 通过目标对象的无参构造实例化
      Object obj = clazz.getDeclaredConstructor().newInstance();
      //通过反射设置属性
      BeanUtils.setValue(obj,value);
      return (T) obj;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}

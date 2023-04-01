package com.attributeAssignMent;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author zhr_java@163.com
 * @date 2022/4/9 17:07
 */
public class BeanUtils {
  public static void setValue(Object obj, String value) {
    String result[] = value.split(",");
    for (int i = 0; i < result.length; i++) {
      Object currentObj = obj;
      Object currentObjBefore = obj;
      String attribute[] = result[i].split(":");
      // 添加try防止获取不到属性对象而终止操作
      try {
        // 判断属性名称里面是否有点，如果有点的话就应该是联级
        if (attribute[0].contains(".")) {
          String temp[] = attribute[0].split("\\.");
          // 最后一个该赋值了
          for (int o = 0; o < temp.length - 1; o++) {
            Field field = currentObj.getClass().getDeclaredField(temp[o]);
            Method getMethod =
                currentObj.getClass().getDeclaredMethod("get" + StringUtils.initcap(temp[o]));
            Method setMethod =
                currentObj
                    .getClass()
                    .getDeclaredMethod("set" + StringUtils.initcap(temp[o]), field.getType());

            // 判断该属性未实例化
            if (getMethod.invoke(currentObj) == null) {
              // 创建一个实例
              currentObj = field.getType().getDeclaredConstructor().newInstance();
              setMethod.invoke(currentObjBefore, currentObj);
              currentObjBefore = currentObj;
            } else {
              currentObj = getMethod.invoke(currentObj);
            }
          }

          // 获取成员，这里是为了要获取属性的类型
          Field field = currentObj.getClass().getDeclaredField(temp[temp.length - 1]);
          System.out.println(field);
          Method method =
              currentObj
                  .getClass()
                  .getDeclaredMethod(
                      "set" + StringUtils.initcap(temp[temp.length - 1]), field.getType());
          System.out.println(method);
          Object attributeValue = BeanUtils.convertParam(field.getType().getName(), attribute[1]);
          // 调用方法
          method.invoke(currentObj, attributeValue);
        } else {
          // 根据属性名获取属性对象
          Field field = obj.getClass().getDeclaredField(attribute[0]);
          // 获取属性对应的set方法
          Method method =
              obj.getClass()
                  .getDeclaredMethod("set" + StringUtils.initcap(attribute[0]), field.getType());
          Object attributeValue = convertParam(field.getType().getName(), attribute[1]);
          // 给对象里面的属性赋值
          method.invoke(obj, attributeValue);
        }
      } catch (Exception e) {

      }
    }
  }

  /**
   * 根据类中的属性更改传入属性的类型,此处建议根据实际开发来扩展，建议先把基本的八大类型扩展出来
   *
   * @param attType 属性类型
   * @param value 属性值
   * @return
   */
  public static Object convertParam(String attType, String value) {
    if ("double".equals(attType) || "java.lang.Double".equals(attType)) {
      return Double.parseDouble(value);
    } else if ("int".equals(attType) || "java.lang.Integer".equals(attType)) {
      return Integer.parseInt(value);
    } else if ("java.util.Date".equals(attType)) {
      SimpleDateFormat time;
      if (value.matches("\\d{4}-\\d{2}-\\d{2}")) {
        time = new SimpleDateFormat("yyyy-MM-dd");
      } else if (value.matches("\\d{2}-\\d{2}-\\d{2}")) {
        time = new SimpleDateFormat("HH-mm-ss");
      } else if (value.matches("\\d{4}-\\d{2}-\\d{2} \\d{2}-\\d{2}-\\d{2}")) {
        time = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
      } else {
        return new Date();
      }
      try {
        return time.parse(value);
      } catch (ParseException e) {
        e.printStackTrace();
        return new Date();
      }

    } else {
      return value;
    }
  }
}

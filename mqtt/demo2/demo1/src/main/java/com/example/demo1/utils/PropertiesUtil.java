package com.example.demo1.utils;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 获取配置信息
 **/
public class PropertiesUtil {
 
       public static String MQTT_HOST;//mqtt服务的IP
       public static String MQTT_CLIENT_ID;//客户端的id
       public static String MQTT_USER_NAME;//客户端的名称
       public static String MQTT_PASSWORD;//客户端的密码
       public static String MQTT_TOPIC;//主题
       public static Integer MQTT_TIMEOUT;//超时时间（秒）
       public static Integer MQTT_KEEP_ALIVE;//心跳时间/秒

       /**
        * mqtt配置
        */
         static {
              Properties properties = loadMqttProperties();
              MQTT_HOST = properties.getProperty("host");
              MQTT_CLIENT_ID = properties.getProperty("clientId");
              MQTT_USER_NAME = properties.getProperty("username");
              MQTT_PASSWORD = properties.getProperty("password");
              MQTT_TOPIC = properties.getProperty("topic");
              MQTT_TIMEOUT = Integer.valueOf(properties.getProperty("timeout"));
              MQTT_KEEP_ALIVE = Integer.valueOf(properties.getProperty("keepalive"));
          }
 
          private static Properties loadMqttProperties() {
             InputStream inputstream = PropertiesUtil.class.getResourceAsStream("/application.yml");
             Properties properties = new Properties();
             try {
                 //加载文件输入流，并返回文件输入流对象（map类型）
                 properties.load(inputstream);
                 return properties;
             } catch (IOException e) {
                 throw new RuntimeException(e);
             } finally {
                 try {
                    if (inputstream != null) {
                       inputstream.close();
                    }
                 } catch (IOException e) {
                     throw new RuntimeException(e);
                 }
             }
          }
}

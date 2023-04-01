package com.example.demo1.utils;
import org.eclipse.paho.client.mqttv3.*;

import java.util.Arrays;

/**
   * mqtt回调处理类
   */

public class MqttConsumerCallback implements MqttCallbackExtended {
 
       private MqttClient client;//客户端，初始化客户端的URI和id
       private MqttConnectOptions options;//mqtt的连接对象，包括了用户的账号密码，连接心跳，连接超时时间
       private String[] topic;//主题
       private int[] qos;//连接质量
 
       public MqttConsumerCallback(MqttClient client, MqttConnectOptions options, String[] topic, int[] qos) {
               this.client = client;
               this.options = options;
               this.topic = topic;
               this.qos = qos;
       }
 
       /**
        * 断开重连
        */
       @Override
       public void connectionLost(Throwable cause) {
               System.out.println("MQTT连接断开，发起重连......");
               try {
                       if (null != client && !client.isConnected()) {
                               client.reconnect();
                               System.out.println("尝试重新连接");
                       } else {
                               client.connect(options);
                               System.out.println("尝试建立新连接");
                       }
               } catch (Exception e) {
                       e.printStackTrace();
               }
       }
 
       /**
        * 接收到消息调用令牌中调用
        */
       @Override
       public void deliveryComplete(IMqttDeliveryToken token) {
               System.out.println("deliveryComplete---------" + Arrays.toString(topic));
       }
 
       /**
        * 消息处理
        */
       @Override
       public void messageArrived(String topic, MqttMessage message) {
               try {
                       String msg = new String(message.getPayload());
                       System.out.println("收到topic:" + topic + " 消息：" + msg);
                       System.out.println("收到消息后执行具体的业务逻辑操作，比如将消息存储进数据库");
               } catch (Exception e) {
                       System.out.println("处理mqtt消息异常:" + e);
               }
       }
 
       /**
        * mqtt连接后订阅主题
        */
       @Override
       public void connectComplete(boolean b, String s) {
           try {
               if (null != topic && null != qos) {
                   if (client.isConnected()) {
                       client.subscribe(topic, qos);
                       System.out.println("mqtt连接成功，客户端ID：" + PropertiesUtil.MQTT_CLIENT_ID);
                       System.out.println("--订阅主题:：" + Arrays.toString(topic));
                   } else {
                       System.out.println("mqtt连接失败，客户端ID：" + PropertiesUtil.MQTT_CLIENT_ID);
                   }
               }
           } catch (Exception e) {
               System.out.println("mqtt订阅主题异常:" + e);
           }
       }
}

package com.example.demo1.consumer;
import com.example.demo1.utils.MqttConsumerCallback;
import com.example.demo1.utils.PropertiesUtil;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


@Component
public class MqttConsumer implements ApplicationRunner {
 
    private static MqttClient client;
 
    @Override
    public void run(ApplicationArguments args) {
        System.out.println("初始化并启动mqtt......");
        this.connect();
    }
 
    /**
      * 连接mqtt服务器
      */
    private void connect() {
        try {
            // 1 创建客户端
            getClient();
            // 2 设置配置
            MqttConnectOptions options = getOptions();
            String[] topic = PropertiesUtil.MQTT_TOPIC.split(",");
            // 3 消息发布质量
            int[] qos = getQos(topic.length);
            // 4 最后设置
            create(options, topic, qos);
        } catch (Exception e) {
            System.out.println("mqtt连接异常：" + e);
        }
    }
 
    /**
      *  创建客户端  --- 1 ---
      */
    public void getClient() {
        try {
            if (null == client) {
                client = new MqttClient(PropertiesUtil.MQTT_HOST, PropertiesUtil.MQTT_CLIENT_ID, new MemoryPersistence());
            }
            System.out.println("创建mqtt客户端：" );
        } catch (Exception e) {
            System.out.println("创建mqtt客户端异常：\" + e：" );
        }
    }
 
    /**
      *  生成配置对象，用户名，密码等  --- 2 ---
      */
    public MqttConnectOptions getOptions() {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(PropertiesUtil.MQTT_USER_NAME);
        options.setPassword(PropertiesUtil.MQTT_PASSWORD.toCharArray());
        // 设置超时时间
        options.setConnectionTimeout(PropertiesUtil.MQTT_TIMEOUT);
        // 设置会话心跳时间
        options.setKeepAliveInterval(PropertiesUtil.MQTT_KEEP_ALIVE);
        // 是否清除session
        options.setCleanSession(false);
        System.out.println("--生成mqtt配置对象");
        return options;
    }
 
    /**
      *  qos   --- 3 ---
      */
    public int[] getQos(int length) {
        int[] qos = new int[length];
        for (int i = 0; i < length; i++) {
            /**
             *  MQTT协议中有三种消息发布服务质量:
             *
             * QOS0： “至多一次”，消息发布完全依赖底层 TCP/IP 网络。会发生消息丢失或重复。这一级别可用于如下情况，环境传感器数据，丢失一次读记录无所谓，因为不久后还会有第二次发送。
             * QOS1： “至少一次”，确保消息到达，但消息重复可能会发生。
             * QOS2： “只有一次”，确保消息到达一次。这一级别可用于如下情况，在计费系统中，消息重复或丢失会导致不正确的结果，资源开销大
             */
            qos[i] = 1;
        }
        System.out.println("--设置消息发布质量");
        return qos;
    }
 
    /**
      *  装载各种实例和订阅主题  --- 4 ---
      */
    public void create(MqttConnectOptions options, String[] topic, int[] qos) {
        try {
            //初始化回调处理类
            client.setCallback(new MqttConsumerCallback(client, options, topic, qos));
            //开启回调
            System.out.println("--添加回调处理类");
            client.connect(options);
        } catch (Exception e) {
            System.out.println("装载实例或订阅主题异常：" + e);
        }
    }
    /**
      * 订阅某个主题
      *
      * @param topic
      * @param qos
      */
    public static void subscribe(String topic, int qos) {
        try {
            System.out.println("topic:" + topic);
            client.subscribe(topic, qos);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
 
    /**
      * 发布，非持久化
      *
      *  qos根据文档设置为1
      *
      * @param topic
      * @param msg
      */
    public static void publish(String topic, String msg) {
        publish(1, false, topic, msg);
    }
 
    /**
      * 发布
      */
    public static void publish(int qos, boolean retained, String topic, String pushMessage) {
        MqttMessage message = new MqttMessage();
        message.setQos(qos);
        message.setRetained(retained);
        message.setPayload(pushMessage.getBytes());
        MqttTopic mTopic = client.getTopic(topic);
        if (null == mTopic) {
            System.out.println("topic：" + topic + " 不存在");
        }
        MqttDeliveryToken token;
        try {
            token = mTopic.publish(message);
            token.waitForCompletion();
 
            if (!token.isComplete()) {
                System.out.println("消息发送成功");
            }
        } catch (MqttPersistenceException e) {
            e.printStackTrace();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}

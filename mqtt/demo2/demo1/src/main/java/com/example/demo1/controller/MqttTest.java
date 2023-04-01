package com.example.demo1.controller;
import com.example.demo1.consumer.MqttConsumer;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/testmqtt")
public class MqttTest {
          /**
              * 测试推送消息
              */
          @ResponseBody
          @GetMapping(value = "/push")
          public Object push(@RequestBody Map<String,Object> json) {
              String topic = (String) json.get("topic");
              String msg = (String) json.get("msg");
              System.out.println("topic:"+topic+" msg:"+msg);
                      MqttConsumer.publish(topic, msg);
                      return "测试发布主题成功";
          }

        /**
         * 测试接收消息
         */
        @ResponseBody
        @GetMapping(value = "/subscribe")
        public Object subscribe(@RequestBody Map<String,Object> json) {
            String topic = (String) json.get("topic");
            int qus = (int) json.get("qus");
            MqttConsumer.subscribe(topic, qus);
            return "订阅主题"+topic+"成功";
        }
}

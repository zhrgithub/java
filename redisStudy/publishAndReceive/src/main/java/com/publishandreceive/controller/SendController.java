package com.publishandreceive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhr_java@163.com
 * @date 2022/5/2 10:44
 */
@RestController
@RequestMapping("redis")
public class SendController {

  @Autowired private StringRedisTemplate stringRedisTemplate;

  @GetMapping("sendRedisMessageTest")
  public String SendRedisMessage(String message) {

    System.out.println("Sending message:" + message);
    try {
      // 第一个参数是，消息推送的主题名称；第二个参数是，要推送的消息信息
      // "chat"->主题
      // "我是一条消息"->要推送的消息
      stringRedisTemplate.convertAndSend("chat", message);
      return "Send Success";
    } catch (Exception e) {
      return "send fail";
    }
  }
}

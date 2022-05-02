package com.publishandreceive.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @author zhr_java@163.com
 * @date 2022/5/2 10:51
 */
@Component
public class Receiver {
  private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

  /**
   * 接收到消息的方法，message就是指从主题获取的消息，主题配置在RedisMessageListener配置类做配置
   *
   * @param message
   */
  public void receiveMessage(String message) {
    LOGGER.info("Received Message：{}", message);
  }
}

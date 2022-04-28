package com.websocketofnetty.server;

import com.websocketofnetty.message.Message;
import io.netty.channel.Channel;
import io.netty.channel.ChannelId;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.concurrent.ConcurrentHashMap;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 13:24 @Description"用于管理连接的channel，用户存储，消息单发，消息群发"
 */
@Component
public class NettyManager {

  private Logger logger = LoggerFactory.getLogger(getClass());
  /** 建立连接的时候添加 key:channelId value：channel */
  private ConcurrentHashMap<ChannelId, Channel> channelMap = new ConcurrentHashMap();

  /**
   * 发消息的时候添加,userId表示当前用户名字或者用户ID（必须是唯一的），消息体还可以添加toUSerId（也必须是唯一的）,
   * 如果发送消息的时候映射中不存在就保存userId，如果存在就不要保存，如果接收消息的人存在并且接收人的channel是连接的状态，那么就发送，否则做一下消息缓存，
   * 或者回复发送者您发送的用户不在线 key: userId value:channelId
   */
  private ConcurrentHashMap<String, Channel> userMap = new ConcurrentHashMap();

  /**
   * 建立连接后存储channel
   *
   * @param channel
   */
  public void addChannel(Channel channel) {
    if (channel != null) {
      channelMap.put(channel.id(), channel);
      return;
    }
    logger.info("[channel不存在或者已关闭]");
  }

  /** 断开连接之后移除channelId */
  public void removeChannel(ChannelId channelId) {
    if (!ObjectUtils.isEmpty(channelId)) {
      channelMap.remove(channelId);
    }
  }

  /** 添加用户 */
  public void addUser(String userId, Channel channel) {

    Channel existingChannel = channelMap.get(channel.id());

    if (ObjectUtils.isEmpty(existingChannel)) {
      logger.error("[addUser][连接({}) 不存在]", channel.id());
      return;
    }

    userMap.put(userId, existingChannel);
  }

  /** 单发 */
  public void send(Message message) {
    logger.info("单发消息不可见");
    Channel channel = userMap.get(message.getToUser());
    if (ObjectUtils.isEmpty(channel)) {
      logger.error("[接收者未建立连接]");
      // TODO，可以做一下消息缓存（缓存到Redis或者MongoDB中），等接收方上线后再发送，，或者回复客户对方没有上线
      Channel fromChannel= userMap.get(message.getFromUser());
      fromChannel.writeAndFlush(new TextWebSocketFrame("对方没有上线"));
      return;
    }
    if (!channel.isActive()) {
      logger.error("用户{}不在线", message.getToUser());
      return;
    }
    channel.writeAndFlush(new TextWebSocketFrame(message.toString()));
  }

  /** 群发 */
  public void sendAll(Message message) {
    channelMap
        .values()
        .forEach(
            channel -> {
              if (!channel.isActive()) {
                logger.error("channelId={}不在线", channel.id());
                return;
              }
              channel.writeAndFlush(new TextWebSocketFrame("群发消息：" + message.getContent()));
            });
  }
  //根据某个群聊ID来群发

  //根据你的好友来群发


}

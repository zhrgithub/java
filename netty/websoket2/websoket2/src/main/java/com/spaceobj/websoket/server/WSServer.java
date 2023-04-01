package com.spaceobj.websoket.server;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 11:42
 */
@Component
public class WSServer {

  private Logger logger = LoggerFactory.getLogger(getClass());

  @Value("${netty.port}")
  private Integer port=8088;

  @Autowired
  private WSServerInitialzer wsServerInitialzer;


  /** 定义一对线程组 主线程组, 用于接受客户端的连接， */
  EventLoopGroup mainGroup = new NioEventLoopGroup();

  /** 从线程组, 负责IO交互工作 */
  EventLoopGroup subGroup = new NioEventLoopGroup();

  /**
   * Netty Server Channel
   */
  private Channel channel;

  @PostConstruct
  public void start() throws InterruptedException {
    try {
      // netty服务器的创建, 辅助工具类，用于服务器通道的一系列配置
      ServerBootstrap server = new ServerBootstrap();
      // 绑定两个线程组
      server
              .group(mainGroup, subGroup)
              // 指定NIO的模式
              .channel(NioServerSocketChannel.class)
              // 子处理器，用于处理workerGroup
              .childHandler(wsServerInitialzer);

      // 启动server，并且设置8088为启动的端口号，同时启动方式为同步
      ChannelFuture future = server.bind(port).sync();
      if (future.isSuccess()) {
        channel = future.channel();
        logger.info("[start][Netty Server 启动在 {} 端口]", port);
      }

      // 监听关闭的channel，设置位同步方式
      future.channel().closeFuture().sync();
    } finally {
      if (channel!=null){
        channel.close();
      }
      // 退出线程组
      mainGroup.shutdownGracefully();
      subGroup.shutdownGracefully();
    }
  }

}

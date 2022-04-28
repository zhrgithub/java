package com.websocketofnetty.server;

import com.websocketofnetty.handler.ChatHandler;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.ReadTimeoutHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 11:49
 */
@Component
public class WSServerInitialzer extends ChannelInitializer<SocketChannel> {
  /** 心跳超时时间 */
  private static final Integer READ_TIMEOUT_SECONDS = 3 * 60;

  @Autowired
  private ChatHandler chatHandler;

  @Override
  protected void initChannel(SocketChannel ch) throws Exception {
    ChannelPipeline pipeline = ch.pipeline();

    // websocket 基于http协议，所以要有http编解码器 服务端用HttpServerCodec
    pipeline.addLast(new HttpServerCodec());
    // 对写大数据流的支持
    pipeline.addLast(new ChunkedWriteHandler());
    // 空闲检测
    pipeline.addLast(new ReadTimeoutHandler(READ_TIMEOUT_SECONDS, TimeUnit.SECONDS));

    /**
     * 我们通常接收到的是一个http片段，如果要想完整接受一次请求的所有数据，我们需要绑定HttpObjectAggregator，然后我们
     * 就可以收到一个FullHttpRequest-是一个完整的请求信息。 对httpMessage进行聚合，聚合成FullHttpRequest或FullHttpResponse
     * 几乎在netty中的编程，都会使用到此hanler
     */
    pipeline.addLast(new HttpObjectAggregator(1024 * 64));

    // ====================== 以上是用于支持http协议 , 以下是支持httpWebsocket   ======================

    /**
     * websocket 服务器处理的协议，用于指定给客户端连接访问的路由 : /ws 本handler会帮你处理一些繁重的复杂的事 会帮你处理握手动作： handshaking（close,
     * ping, pong） ping + pong = 心跳 对于websocket来讲，都是以frames进行传输的，不同的数据类型对应的frames也不同
     */
    pipeline.addLast(new WebSocketServerProtocolHandler("/ws"));

    // 自定义的handler
    pipeline.addLast(chatHandler);
  }
}

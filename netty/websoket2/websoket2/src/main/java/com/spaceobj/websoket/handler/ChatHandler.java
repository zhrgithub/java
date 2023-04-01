package com.spaceobj.websoket.handler;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 11:51
 */

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.spaceobj.websoket.message.Message;
import com.spaceobj.websoket.server.NettyManager;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

/**
 * @author zhr @Description: 处理消息的handler TextWebSocketFrame：
 * 在netty中，是用于为websocket专门处理文本的对象，frame是消息的载体 这里已经指定了类型 如果这里是Object
 * 那么下面还需判断是不是TextWebSocketFrame类型
 */
@Component
@ChannelHandler.Sharable
public class ChatHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private NettyManager nettyManager;

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {

        System.out.println("msg:"+msg.text());
        // 开启复杂处理Map方法
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();

        // 获取客户端传输过来的消息
        Message message = gson.fromJson(msg.text(), new TypeToken<Message>() {

        }.getType());

        System.out.println("服务器接受到的数据：" + message);

        nettyManager.addUser(message.getFromUser(), ctx.channel());

        if (ObjectUtils.isEmpty(message.getToUser())) {
            nettyManager.sendAll(message);
        } else {
            nettyManager.send(message);
        }
    }

    /** 当客户端连接服务端之后（打开连接） 获取客户端的channel，并且放到nettyManager中去进行管理 */
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {

        logger.info("[客户端建立连接的channelId是{}]", ctx.channel().id());
        nettyManager.addChannel(ctx.channel());
        //登录之后可以根据自己的用户名查看缓存的消息，消息可以用MongoDB存储，或者Redis，消费之后删除服务端的缓存
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {

        nettyManager.removeChannel(ctx.channel().id());
        System.out.println("客户端断开，channle对应的长id为：" + ctx.channel().id().asLongText());
        System.out.println("客户端断开，channle对应的短id为：" + ctx.channel().id().asShortText());
    }

}

package com.spaceobj.websoket.handler;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 11:51
 */

import com.alibaba.fastjson.JSON;
import com.spaceobj.websoket.message.Message;
import com.spaceobj.websoket.server.NettyManager;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

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

    }

    // /** 当客户端连接服务端之后（打开连接） 获取客户端的channel，并且放到nettyManager中去进行管理 */
    // @Override
    // public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
    //
    //     logger.info("[客户端建立连接的channelId是{}]", ctx.channel().id());
    //     logger.info("[客户端建立连接的用户ID是{}]",ctx.channel().remoteAddress().toString());
    //     nettyManager.addChannel(ctx.channel());
    //     //登录之后可以根据自己的用户名查看缓存的消息，消息可以用MongoDB存储，或者Redis，消费之后删除服务端的缓存
    // }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        Message message = null;
        nettyManager.addChannel(ctx.channel());
        //首次连接是FullHttpRequest，处理参数
        if (null != msg && msg instanceof FullHttpRequest) {
            FullHttpRequest request = (FullHttpRequest) msg;
            String uri = request.uri();
            Map paramMap = getUrlParams(uri);
            System.out.println("接收到的参数是：" + paramMap);

            nettyManager.addUser(paramMap.get("userId").toString(), ctx.channel());

            //如果url包含参数，重置url
            if (uri.contains("?")) {
                String newUri = uri.substring(0, uri.indexOf("?"));
                System.out.println(newUri);
                request.setUri(newUri);
            }
            message = new Message();
            message.setFromUser("system");
            message.setContent("系统通知");
            message.setToUser("1");
        }
        if (msg instanceof TextWebSocketFrame) {
            //正常的TEXT消息类型
            TextWebSocketFrame frame = (TextWebSocketFrame) msg;
            // 获取客户端传输过来的消息
            message = JSON.parseObject(frame.text(), Message.class);
            System.out.println("服务端收到服务器数据：" + message);
        }
        super.channelRead(ctx, msg);
        // 转发用户缓存消息
        if (ObjectUtils.isEmpty(message.getToUser())) {
            nettyManager.sendAll(message);
        } else {
            nettyManager.send(message);
        }

    }

    private static Map getUrlParams(String url) {

        Map<String, String> map = new HashMap<>();
        System.out.println(url);
        url = url.replace("?", ";");
        System.out.println(url);
        if (!url.contains(";")) {
            return map;
        }

        if (url.split(";").length > 0) {
            String[] arr = url.split(";")[1].split("&");
            for (String s : arr) {
                String key = s.split("=")[0];
                String value = s.split("=")[1];
                map.put(key, value);
            }
            return map;
        } else {
            return map;
        }
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {

        nettyManager.removeChannel(ctx.channel().id());
        System.out.println("客户端断开，channle对应的长id为：" + ctx.channel().id().asLongText());
        System.out.println("客户端断开，channle对应的短id为：" + ctx.channel().id().asShortText());
    }

}

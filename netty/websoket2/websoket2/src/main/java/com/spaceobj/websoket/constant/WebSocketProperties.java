package com.spaceobj.websoket.constant;

public class WebSocketProperties {

    /**
     * 监听端口
     */
    public final static Integer PORT = 8088;

    /**
     * 请求路径
     */
    public final static String PATH = "/ws";

    /**
     * bossGroup线程数
     */
    public final static Integer BOSS = 2;

    /**
     * workGroup线程数
     */
    public final static Integer WORK = 2;

    /**
     * maxFrameSize
     */
    public final static Integer MAX_FRAME_SIZE = 65536;

    /**
     * maxContentLength
     */
    public final static Integer MAX_CONTENT_LENGTH = 1024 * 64;

    /** 超过180秒未发消息，那么就断开 */
    public static final Integer READ_TIMEOUT_SECONDS = 3 * 60;

}

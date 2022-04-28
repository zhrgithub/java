package com.websocketofnetty.message;

import lombok.Data;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 14:35
 */
@Data
public class Message {

    private String fromUser;
    private String toUser;
    private String content;
}

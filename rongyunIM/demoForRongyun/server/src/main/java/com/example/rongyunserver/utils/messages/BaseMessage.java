package com.example.rongyunserver.utils.messages;

/**
 *
 * 消息基类，如实现自定义消息，可继承此类
 *
 **/
public abstract class BaseMessage {

	public abstract String getType();

	@Override
	public abstract String toString();
}

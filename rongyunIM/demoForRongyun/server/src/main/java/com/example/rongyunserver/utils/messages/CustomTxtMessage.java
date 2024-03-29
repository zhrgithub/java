package com.example.rongyunserver.utils.messages;

import com.example.rongyunserver.utils.util.GsonUtil;

/**
 *
 * 自定义消息
 *
 */
public class CustomTxtMessage extends BaseMessage {
	private String content = "";
	private transient static final String TYPE = "RC:TxtMsg";

	public CustomTxtMessage(String content) {
		this.content = content;
	}
	@Override
	public String getType() {
		return TYPE;
	}
	
	/**
	 * 获取自定义消息内容。
	 *
	 * @return String
	 */
	public String getContent() {
		return content;
	}
	
	/**
	 * @param content 设置自定义消息内容。
	 *
	 *
	 */
	public void setContent(String content) {
		this.content = content;
	}  
	
	@Override
	public String toString() {
		return GsonUtil.toJson(this, CustomTxtMessage.class);
	}
}
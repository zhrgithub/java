package com.example.rongyunserver.utils.messages;

import com.example.rongyunserver.utils.util.GsonUtil;

/**
 *
 * 语音消息。
 *
 */
public class VoiceMessage extends BaseMessage {
	private String content = "";
	private String extra = "";
	private Long duration = 0L;
	private UserInfo user = null;
	private transient static final String TYPE = "RC:VcMsg";
	
	public VoiceMessage(String content, String extra, Long duration) {
		this.content = content;
		this.extra = extra;
		this.duration = duration;
	}
	public VoiceMessage(String content, String extra, Long duration, UserInfo user) {
		this.content = content;
		this.extra = extra;
		this.duration = duration;
		this.user = user;
	}
	@Override
	public String getType() {
		return TYPE;
	}
	
	/**
	 * 获取表示语音内容，格式为 AMR，以 Base64 进行 Encode 后需要将所有 \r\n 和 \r 和 \n 替换成空，大小不超过 60k，duration 表示语音长度，最长为 60 秒。
	 *
	 * @return String
	 */
	public String getContent() {
		return content;
	}
	
	/**
	 * @param content 设置表示语音内容，格式为 AMR，以 Base64 进行 Encode 后需要将所有 \r\n 和 \r 和 \n 替换成空，大小不超过 60k，duration 表示语音长度，最长为 60 秒。
	 *
	 *
	 */
	public void setContent(String content) {
		this.content = content;
	}  
	
	/**
	 * 获取为附加信息(如果开发者自己需要，可以自己在 App 端进行解析)。
	 *
	 * @return String
	 */
	public String getExtra() {
		return extra;
	}
	
	/**
	 * @param extra 设置为附加信息(如果开发者自己需要，可以自己在 App 端进行解析)。
	 *
	 *
	 */
	public void setExtra(String extra) {
		this.extra = extra;
	}  
	
	/**
	 * 获取持续时间。
	 *
	 * @return Long
	 */
	public Long getDuration() {
		return duration;
	}
	
	/**
	 * @param duration 设置持续时间。
	 *
	 *
	 */
	public void setDuration(Long duration) {
		this.duration = duration;
	}

	/**
	 * 获取消息中携带的用户信息(IMKit SDK 会话界面中优先显示消息中携带的用户信息)。
	 *
	 * @return UserInfo
	 */
	public UserInfo getUser() {
		return user;
	}

	/**
	 * @param user 消息中携带的用户信息(IMKit SDK 会话界面中优先显示消息中携带的用户信息)。
	 */
	public void setUser(UserInfo user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return GsonUtil.toJson(this, VoiceMessage.class);
	}
}
package com.example.rongyunserver.utils.messages;

import com.example.rongyunserver.utils.util.GsonUtil;

/**
 *
 * 图片消息。
 *
 */
public class ImgMessage extends BaseMessage {
	private String content = "";
	private String extra = "";
	private String imageUri = "";
	private UserInfo user = null;
	private transient static final String TYPE = "RC:ImgMsg";
	
	public ImgMessage(String content, String extra, String imageUri) {
		this.content = content;
		this.extra = extra;
		this.imageUri = imageUri;
	}
	public ImgMessage(String content, String extra, String imageUri, UserInfo user) {
		this.content = content;
		this.extra = extra;
		this.imageUri = imageUri;
		this.user = user;
	}
	@Override
	public String getType() {
		return TYPE;
	}
	
	/**
	 * 获取表示图片缩略图，格式为 JPG，大小不超过 30k，注意在 Base64 进行 Encode 后需要将所有 \r\n 和 \r 和 \n 替换成空。
	 *
	 * @return String
	 */
	public String getContent() {
		return content;
	}
	
	/**
	 * @param content 设置表示图片缩略图，格式为 JPG，大小不超过 30k，注意在 Base64 进行 Encode 后需要将所有 \r\n 和 \r 和 \n 替换成空。
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
	 * 获取图片 Url。
	 *
	 * @return String
	 */
	public String getImageUri() {
		return imageUri;
	}
	
	/**
	 * @param imageUri 设置图片 Url。
	 *
	 *
	 */
	public void setImageUri(String imageUri) {
		this.imageUri = imageUri;
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
		return GsonUtil.toJson(this, ImgMessage.class);
	}
}
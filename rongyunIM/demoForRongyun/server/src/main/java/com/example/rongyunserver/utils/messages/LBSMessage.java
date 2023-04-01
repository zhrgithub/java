package com.example.rongyunserver.utils.messages;

import com.example.rongyunserver.utils.util.GsonUtil;

/**
 *
 * 位置消息。
 *
 */
public class LBSMessage extends BaseMessage {
	private String content = "";
	private String extra = "";
	private double latitude = 0;
	private double longitude = 0;
	private String poi = "";
	private UserInfo user = null;
	private transient static final String TYPE = "RC:LBSMsg";
	
	public LBSMessage(String content, String extra, double latitude, double longitude, String poi) {
		this.content = content;
		this.extra = extra;
		this.latitude = latitude;
		this.longitude = longitude;
		this.poi = poi;
	}

	public LBSMessage(String content, String extra, double latitude, double longitude, String poi, UserInfo user) {
		this.content = content;
		this.extra = extra;
		this.latitude = latitude;
		this.longitude = longitude;
		this.poi = poi;
		this.user = user;
	}
	@Override
	public String getType() {
		return TYPE;
	}
	
	/**
	 * 获取位置图片缩略图，格式为 JPG，以 Base64 进行 Encode 后需要将所有 \r\n 和 \r 和 \
 替换成空。
	 *
	 * @return String
	 */
	public String getContent() {
		return content;
	}
	
	/**
	 * @param content 设置位置图片缩略图，格式为 JPG，以 Base64 进行 Encode 后需要将所有 \r\n 和 \r 和 \
	 *替换成空。
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
	 * 获取纬度。
	 *
	 * @return double
	 */
	public double getLatitude() {
		return latitude;
	}
	
	/**
	 * @param latitude 设置纬度。
	 *
	 *
	 */
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}  
	
	/**
	 * 获取经度。
	 *
	 * @return double
	 */
	public double getLongitude() {
		return longitude;
	}
	
	/**
	 * @param longitude 设置经度。
	 *
	 *
	 */
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}  
	
	/**
	 * 获取位置信息。
	 *
	 * @return String
	 */
	public String getPoi() {
		return poi;
	}
	
	/**
	 * @param poi  设置位置信息。
	 *
	 *
	 */
	public void setPoi(String poi) {
		this.poi = poi;
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
		return GsonUtil.toJson(this, LBSMessage.class);
	}
}
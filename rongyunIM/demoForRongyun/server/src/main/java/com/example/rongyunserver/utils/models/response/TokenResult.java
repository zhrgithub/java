package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

/**
 * getToken 返回结果
 */
public class TokenResult extends Result{
	// 用户 Token，可以保存应用内，长度在 256 字节以内.用户 Token，可以保存应用内，长度在 256 字节以内。
	String token;
	// 用户 Id，与输入的用户 Id 相同.
	String userId;

	private String reqBody;

	public TokenResult(Integer code, String token, String userId, String errorMessage) {
		this.code = code;
		this.token = token;
		this.userId = userId;
		this.errorMessage = errorMessage;
	}

	/**
	 * 设置token
	 *
	 */	
	public void setToken(String token) {
		this.token = token;
	}
	
	/**
	 * 获取token
	 *
	 * @return String
	 */
	public String getToken() {
		return token;
	}
	
	/**
	 * 设置userId
	 *
	 */	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	/**
	 * 获取userId
	 *
	 * @return String
	 */
	public String getUserId() {
		return userId;
	}


	public String getReqBody() {
		return reqBody;
	}


	public void setReqBody(String reqBody) {
		this.reqBody = reqBody;
	}

	@Override
	public String toString() {
		return GsonUtil.toJson(this, TokenResult.class);
	}
}

package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

/**
 *  VerifyCode 返回结果
 */
public class SMSVerifyCodeResult extends Result {
	// true 验证成功，false 验证失败。
	Boolean success;

	public SMSVerifyCodeResult(Integer code, Boolean success, String errorMessage) {
		super(code, errorMessage);
		this.code = code;
		this.success = success;
		this.errorMessage = errorMessage;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	
	/**
	 * 获取success
	 *
	 * @return Boolean
	 */
	public Boolean getSuccess() {
		return success;
	}

	@Override
	public String toString() {
		return GsonUtil.toJson(this, SMSVerifyCodeResult.class);
	}
}

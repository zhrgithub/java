package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.models.sensitiveword.SensitiveWordModel;
import com.example.rongyunserver.utils.util.GsonUtil;

import java.util.List;

/**
 * listWordfilter返回结果
 */
public class ListWordfilterResult extends Result {
	// 敏感词内容。
	List<SensitiveWordModel> words;

	public ListWordfilterResult(Integer code, List<SensitiveWordModel> words, String errorMessage) {
		super(code, errorMessage);
		this.code = code;
		this.words = words;
		this.errorMessage = errorMessage;
	}
	
	/**
	 * 设置code
	 *
	 */	
	public void setCode(Integer code) {
		this.code = code;
	}
	
	/**
	 * 获取code
	 *
	 * @return Integer
	 */
	public Integer getCode() {
		return code;
	}
	
	/**
	 * 设置words
	 *
	 */	
	public void setWords(List<SensitiveWordModel> words) {
		this.words = words;
	}
	
	/**
	 * 获取words
	 *
	 * @return List
	 */
	public List<SensitiveWordModel> getWords() {
		return words;
	}

	@Override
	public String toString() {
		return GsonUtil.toJson(this, ListWordfilterResult.class);
	}
}

package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

import java.util.List;

/**
 * 查询聊天室属性的应答模板
 * 
 * @author RongCloud
 *
 */
public class ChatroomEntryListResult extends Result {

	public List<ChatroomEntryResult> keys;

	@Override
	public String toString() {
		return GsonUtil.toJson(this, ChatroomEntryListResult.class);
	}
}

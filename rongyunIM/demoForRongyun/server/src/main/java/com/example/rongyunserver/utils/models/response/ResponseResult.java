package com.example.rongyunserver.utils.models.response;

import com.example.rongyunserver.utils.models.Result;
import com.example.rongyunserver.utils.util.GsonUtil;

/**
 *  http 成功返回结果
 */
public class ResponseResult extends Result {
    
    private String reqBody;
    
	public ResponseResult(Integer code, String msg) {
		super(code, msg);
		this.code = code;
		this.errorMessage = msg;
	}

	
	public String getReqBody() {
        return reqBody;
    }


    public void setReqBody(String reqBody) {
        this.reqBody = reqBody;
    }

    @Override
	public String toString() {
		return GsonUtil.toJson(this, ResponseResult.class);
	}
}

package com.example.rongyunserver.utils.example.message;


import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.message.expansion.Expansion;
import com.example.rongyunserver.utils.models.message.*;
import com.example.rongyunserver.utils.models.response.ExpansionResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;


/**
 * 消息扩展示例
 *
 * @author RongCloud
 * @version 3.2.15
 */
public class ExpansionExample {

    /**
     * 此处替换成您的appKey
     */
    private static final String appKey = "appKey";
    /**
     * 此处替换成您的appSecret
     */
    private static final String appSecret = "appSecret";


    public static void main(String[] args) throws Exception {
        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
        Expansion expansion = rongCloud.expansion;

        /**
         * API 文档: https://doc.rongcloud.cn/imserver/server/v1/message/expansion#set
         *
         * 设置消息扩展
         *
         */
        ExpansionModel msg = new ExpansionModel();
        msg.setMsgUID("BS45-NPH4-HV87-10LM");
        msg.setUserId("WNYZbMqpH");
        msg.setTargetId("tjw3zbMrU");
        msg.setConversationType(1);
        HashMap<String, String> kv = new HashMap<String, String>();
        kv.put("type1", "1");
        kv.put("type2", "2");
        kv.put("type3", "3");
        kv.put("type4", "4");
        msg.setExtraKeyVal(kv);
        ResponseResult result = expansion.set(msg);
        System.out.println("set expansion:  " + result.toString());

        /**
         * API 文档: https://doc.rongcloud.cn/imserver/server/v1/message/expansion#delete
         *
         * 删除消息扩展
         *
         */
        Set eKey = new HashSet();
        eKey.add("type1");
        eKey.add("type2");
        msg.setExtraKey(eKey);
        result = expansion.remove(msg);
        System.out.println("remove expansion:  " + result.toString());

        /**
         * API 文档: https://doc.rongcloud.cn/imserver/server/v1/message/expansion#query
         *
         * 获取扩展信息
         *
         */
        ExpansionResult eResult = (ExpansionResult)expansion.getList("BS45-NPH4-HV87-10LM");
        System.out.println("getList expansion:  " + eResult.toString());

    }

}

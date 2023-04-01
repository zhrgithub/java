package com.example.rongyunserver.utils.example.user;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.models.*;
import com.example.rongyunserver.utils.models.response.*;
import com.example.rongyunserver.utils.models.user.BatchTagModel;
import com.example.rongyunserver.utils.models.user.GetTagModel;
import com.example.rongyunserver.utils.models.user.TagModel;

/**
 * Demo class
 *
 * @author RongCloud
 *
 */
public class TagExample {
    /**
     * 此处替换成您的appKey
     * */
    private static final String appKey = "appKey";
    /**
     * 此处替换成您的appSecret
     * */
    private static final String appSecret = "appSecret";
    /**
     * 自定义api地址
     * */
    private static final String api = "http://api-cn.ronghub.com";


    public static void main(String[] args) throws Exception {
        RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);

        /**
         *
         * API 文档:
         * https://www.rongcloud.cn/docs/push_service.html#user_tag_set
         *
         * 添加标签
         *
         **/
        TagModel tagmodel = new TagModel();
        tagmodel.setTags(new String[] {"男", "90后"});
        tagmodel.setUserId("userId1");
        Result result = rongCloud.user.tag.set(tagmodel);

        System.out.println("setTag: " + result.toString());

        /**
         *
         * API 文档:
         * https://www.rongcloud.cn/docs/push_service.html#user_tag_batch_set
         *
         * 批量添加标签
         *
         **/
        BatchTagModel batchtagmodel = new BatchTagModel();
        batchtagmodel.setTags(new String[] {"男", "90后"});
        batchtagmodel.setUserIds(new String[] {"userId1", "userId2"});
        result = rongCloud.user.tag.batchSet(batchtagmodel);

        System.out.println("batchSetTag: " + result.toString());


        /**
         *
         * API 文档:
         * https://www.rongcloud.cn/docs/push_service.html#user_tags_get
         *
         * 查询用户标签
         *
         **/
        GetTagModel tag = new GetTagModel();
        tag.setUserIds(new String[] {"userId1", "userId2"});
        GetTagResult result1 = rongCloud.user.tag.get(tag);

        System.out.println("getTag: " + result1.toString());
    }
}

package com.example.rongyunserver.utils.example.sensitive;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.sensitive.SensitiveWord;
import com.example.rongyunserver.utils.models.response.ListWordfilterResult;
import com.example.rongyunserver.utils.models.response.ResponseResult;
import com.example.rongyunserver.utils.models.sensitiveword.SensitiveWordModel;

public class SensitiveExample {
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
        //自定义 api 地址方式
        // RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret,api);

        SensitiveWord SensitiveWord = rongCloud.sensitiveword;

        /**
         *API 文档: http://www.rongcloud.cn/docs/server_sdk_api/sensitive/sensitive.html#add
         *
         * 添加替换敏感词方法
         *
         * */
        SensitiveWordModel sentiveWord = new SensitiveWordModel()
                .setType(0)
                .setKeyword("黄赌毒")
                .setReplace("***");
        ResponseResult addesult = SensitiveWord.add(sentiveWord);
        System.out.println("sentiveWord add:  " + addesult.toString());

        /**
         *API 文档: http://www.rongcloud.cn/docs/server_sdk_api/sensitive/sensitive.html#add
         *
         * 添加替换敏感词方法
         *
         * */
        sentiveWord = new SensitiveWordModel()
                .setType(1)
                .setKeyword("黄赌毒");
        ResponseResult addersult = SensitiveWord.add(sentiveWord);
        System.out.println("sentiveWord  add replace :  " + addersult.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/sensitive/sensitive.html#getList
         * 查询敏感词列表方法
         *
         * */
        ListWordfilterResult result = SensitiveWord.getList(1);
        System.out.println("getList:  " + result.toString());

        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/sensitive/sensitive.html#remove
         * 移除敏感词方法（从敏感词列表中，移除某一敏感词。）
         *
         * */

        ResponseResult removeesult = SensitiveWord.remove("money");
        System.out.println("SensitivewordDelete:  " + removeesult.toString());


        /**
         *
         * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/sensitive/sensitive.html#remove
         * 批量移除敏感词方法（从敏感词列表中，批量移除某一敏感词。）
         *
         * */
        String[] words = {"黄赌毒"};
        ResponseResult batchDeleteResult = SensitiveWord.batchDelete(words);
        System.out.println("SensitivewordbatchDelete:  " + batchDeleteResult.toString());

    }
}

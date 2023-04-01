package com.qf.firstdemo.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/***
 * 1.引入配置文件中的名称
 * 2.映射出文件中的每个字段的名称
 * 3.调用Lombok中的setget方法
 */
@ConfigurationProperties(prefix = "aliyun")
@Component
@Data
public class AliyunProperties {

    private String aaa;

    private String bbb;

    private String ccc;
}

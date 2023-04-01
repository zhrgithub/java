package com.example.rongyunserver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.rongyunserver.dto.NewInfo;
import com.example.rongyunserver.dto.User;

import java.util.List;

public interface NewInfoService extends IService<NewInfo> {

    //新增消息
    public int add(NewInfo newInfo);

    //删除消息
    public int delete(String id);

    //修改消息
    public int modify(NewInfo newInfo);

    //根据ID查询消息
    public NewInfo getInfoById(String id);

    //查询消息列表
    public List<NewInfo> getNewInfoList();


}

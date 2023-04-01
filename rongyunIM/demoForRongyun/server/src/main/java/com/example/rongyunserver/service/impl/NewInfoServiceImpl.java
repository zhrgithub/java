
package com.example.rongyunserver.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.rongyunserver.dto.NewInfo;
import com.example.rongyunserver.dto.User;
import com.example.rongyunserver.mapper.NewInfoMapper;
import com.example.rongyunserver.mapper.UserMapper;
import com.example.rongyunserver.service.NewInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewInfoServiceImpl extends ServiceImpl<NewInfoMapper, NewInfo> implements NewInfoService {

    @Autowired
    private NewInfoMapper newInfoMapper;

    @Override
    public int add(NewInfo newInfo) {
        return this.newInfoMapper.insert(newInfo);
    }

    @Override
    public int delete(String id) {
        return this.newInfoMapper.deleteById(id);
    }

    @Override
    public int modify(NewInfo newInfo) {
        QueryWrapper<NewInfo> queryWrapper = new QueryWrapper<NewInfo>();
        queryWrapper.eq("client_id",newInfo.getClientId());
        return this.newInfoMapper.update(newInfo,queryWrapper);
    }

    @Override
    public NewInfo getInfoById(String id) {
        QueryWrapper<NewInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("client_id",id);
        return this.newInfoMapper.selectOne(queryWrapper);
    }

    @Override
    public List<NewInfo> getNewInfoList() {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.orderByDesc("update_time");
        return this.newInfoMapper.selectList(queryWrapper);
    }


}

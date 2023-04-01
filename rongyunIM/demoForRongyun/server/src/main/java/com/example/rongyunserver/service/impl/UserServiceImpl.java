package com.example.rongyunserver.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.rongyunserver.dto.User;
import com.example.rongyunserver.mapper.UserMapper;
import com.example.rongyunserver.service.UserService;
import com.example.rongyunserver.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public int add(User user) {
        int num = userMapper.insert(user);
        return num;
    }

    @Override
    public int delUser(String id) {
        int num = userMapper.deleteById(id);
        return num;
    }

    @Override
    public int modifyUser(User user) {
        int num = userMapper.updateById(user);
        return num;
    }

    @Override
    public User getInfoById(String id) {
        User user = userMapper.selectById(id);
        return user;
    }
}

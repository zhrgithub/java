package com.example.rongyunserver.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.rongyunserver.dto.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}

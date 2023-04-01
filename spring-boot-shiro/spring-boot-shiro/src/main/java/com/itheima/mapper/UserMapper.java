package com.itheima.mapper;

import com.itheima.domain.User;
import org.springframework.stereotype.Service;
@Service
public interface UserMapper {
    User findByName(String name);
    User findById(Integer id);
}

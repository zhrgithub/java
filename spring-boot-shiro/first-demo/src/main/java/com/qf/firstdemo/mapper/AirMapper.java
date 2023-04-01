package com.qf.firstdemo.mapper;

import com.qf.firstdemo.pojo.Air;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
@Configuration
public interface AirMapper {

     List<Air> findAll();
}

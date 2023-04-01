package com.example.rongyunserver.utils.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.JarURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * Json公共服务
 *
 * @author RongCloud
 */
public class JsonUtil {
    /**
     * 获取JsonObject
     *
     * @param path 项目路径
     * @param jsonName json文件名字
     *
     * @return JsonObject
     * @throws IOException
     **/
    public static <T> T getJsonObject(String path,String jsonName) throws IOException {
        BufferedReader reader = null ;
        try {
            String line="";
            StringBuffer arrs=new StringBuffer();
           /*if(JSONFILE.contains(".jar")){
                reader =new BufferedReader( new InputStreamReader(loadResourceFromJarURL(JSONFILE,path,jsonName)));
            }else{
                reader =new BufferedReader( new InputStreamReader(new FileInputStream(JSONFILE+path+jsonName)));
            }*/
            reader = new BufferedReader(new InputStreamReader(JsonUtil.class.getResourceAsStream("/jsonsource/" + path + jsonName),"UTF-8"));
            while ((line = reader.readLine()) != null){
                arrs.append(line);
            }
            JSONObject object =  JSON.parseObject(arrs.toString());
            return (T)object;
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            if(null != reader){
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }
    /**
     * 读取Jar文件中的资源
     *
     * @param jarUrl
     *   本地jar文件路径
     * @param jsonName
     *   资源文件所在jar中的路径(不能以'/'字符开头)
     * @return 如果资源加载失败,返回null
     */
    public static InputStream loadResourceFromJarURL(String jarUrl,String path,String jsonName){
        URL url = null;
        try {
            jarUrl = jarUrl.substring(0,jarUrl.indexOf("!/")+2);
            url = new URL("jar:" +jarUrl);
            JarURLConnection jarURLConnection = (JarURLConnection) url.openConnection();
            JarFile jarFile = jarURLConnection.getJarFile();
            JarEntry jarEntry = jarFile.getJarEntry("jsonsource/"+path+jsonName);
            if (jarEntry == null) {
                return null;
            }
            return jarFile.getInputStream(jarEntry);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static void main(String[] args){
        try {
           System.out.println((String)getJsonObject("group","/verify.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}

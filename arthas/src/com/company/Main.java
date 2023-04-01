package com.company;

import sun.misc.LRUCache;

import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.locks.AbstractQueuedSynchronizer;

public class Main {

    public static void main(String[] args) {

	// write your code here
        ConcurrentHashMap cache = new ConcurrentHashMap();

        cache.put("小明","1");
        cache.put("小李","2");
        cache.put("小红","3");
        cache.put("小刚","23");
        cache.put("小力","4");
        cache.put("小王","66");
        cache.put("小黄","1");
        cache.put("小青","2");
        cache.put("小绿","212");
        cache.put("小黑","2");
        cache.put("小蓝","21");
        cache.put("小紫","21");
        cache.put("小橙","21");
        cache.put("小赤","3");
        cache.put("Frank","23");


        System.out.println(cache.keys());
        System.out.println(cache.size());
        System.out.println(cache.containsValue("23"));
        System.out.println(cache.containsKey("Frank"));

        int d = 1;
        System.out.println(~d);
        LinkedHashMap linkedHashMap = new LinkedHashMap();
        HashMap hashMap = new HashMap();

        LRUCache lruCache;

        ArrayList<String> aa = new ArrayList();
        HashSet<String> hashSet = new HashSet();
        for (int i = 0;i<10;i++){
            aa.add("i"+i);
            hashSet.add("i"+i);
        }

        for(String s:aa){
            System.out.print(s+" ");
        }
        System.out.println();

        for(String s:hashSet){
            System.out.print(s+" ");
        }

        Objects objects;
        Objects.equals(aa,hashSet);
        TreeMap treeMap = new TreeMap();
        Collections collections;
        ThreadPoolExecutor threadPoolExecutor;
        AbstractQueuedSynchronizer abstractQueuedSynchronizer;

        ByteBuffer byteBuffer = ByteBuffer.allocate(100);
        byteBuffer.clear();

        FileChannel fileChannle;
        SocketChannel socketChannel;
        ServerSocketChannel serverSocketChannel;
        Selector selector;



















    }
}

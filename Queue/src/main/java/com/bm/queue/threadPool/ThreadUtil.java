package com.bm.queue.threadPool;


import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadUtil {
    public static ExecutorService threadService = Executors.newFixedThreadPool(20);
}

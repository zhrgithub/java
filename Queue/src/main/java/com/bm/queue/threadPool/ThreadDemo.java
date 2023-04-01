package com.bm.queue.threadPool;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ThreadDemo {
    private static int counts;
    int count = 0;
    Lock lock = new ReentrantLock();
    public static void main(String[] args) {

        ThreadDemo threadDemo = new ThreadDemo();
        long t1 = System.currentTimeMillis();
        for (int i=0;i<100000000;i++){
            threadDemo.synchronizeFunction();
//            threadDemo.lockFunction();
//            ThreadUtil.threadService.execute(()->{
//                counts++;
//                System.out.println(counts);
//            });
        }
        long t2 = System.currentTimeMillis();
        long t3 = t2 - t1;
        System.out.println(t3);


    }

    public void synchronizeFunction(){
        synchronized (this){
//            count++;
//            Student student = new Student();
//            student.setName("小明"+count);
//            student.setAge(count);
//            System.out.println("aaa");
        }
    }

    public void lockFunction(){
        lock.lock();
        try {
//            count++;
//            Student student = new Student();
//            student.setName("小明"+count);
//            student.setAge(count);
//            System.out.println("bbb");
        }catch (RuntimeException e){
            throw new RuntimeException("运行时异常！！");
        }finally {
            lock.unlock();
        }

    }

}

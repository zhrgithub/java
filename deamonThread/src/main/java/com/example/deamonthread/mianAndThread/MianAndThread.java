package com.example.deamonthread.mianAndThread;




public class MianAndThread {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("睡了5s后打印,这是出main之外的非守护线程，这个推出后这个引用结束，" +
                    "jvm声明周期结束。任务管理的java/javaw.exe进程结束");
        });
        thread.start();
        System.out.println("mian线程直接打印，mian线程结束，电脑任务管理器的java/javaw.exe进程并没有结束。");
    }
}

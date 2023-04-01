package com.multyThread;

public class TestThread {

    public static void main(String[] args) {
        Product product = new Product();
        ThreadDemo threadDemo = new ThreadDemo(product);
        Thread []threads = new Thread[20];
        for (int i = 0;i<20;i++){
            threads[i] = new Thread(threadDemo);
        }

        for (int i = 0;i<threads.length;i++){
            threads[i].start();
        }
    }
}

package com.company;

import java.util.concurrent.locks.ReentrantLock;

public class DemoForOperation {
    ReentrantLock redLock = new ReentrantLock();

    public static void main(String[] args) {
        int a = 8;
        int i = a << 1;
        if ((a<<1)<17){
            System.out.println(i);
        }
    }
}

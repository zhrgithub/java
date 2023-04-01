package com.multyThread;

public class ThreadDemo implements Runnable{
    Product product;
    public ThreadDemo(Product product){
        this.product = product;
    }
    @Override
    public void run() {
        this.product.reduce();
    }
}

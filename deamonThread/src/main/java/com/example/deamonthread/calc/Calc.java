package com.example.deamonthread.calc;

public class Calc {
    static {
        System.loadLibrary("Calc");
    }

    public static native int add(int a,int b);

    public static void main(String[] args) {
        int a = add(2,3);
        System.out.println(a);
    }
}

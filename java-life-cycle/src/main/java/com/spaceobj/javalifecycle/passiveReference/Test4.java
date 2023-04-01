package com.spaceobj.javalifecycle.passiveReference;

class InitClass{
	static {
		System.out.println("初始化InitClass");
	}
	public static String a = null;
	public final static String b = "b";
	public static void method(){}
}
 
class SubInitClass extends InitClass{
	static {
		System.out.println("初始化SubInitClass");
	}
}
 
public class Test4 {
 
	public static void main(String[] args) throws Exception{
		// 引用父类的静态字段，只会引起父类初始化，而不会引起子类的初始化
		String a = SubInitClass.a;

		// 使用类的常量不会引起类的初始化
		String b = InitClass.b;

		// 定义类数组不会引起类的初始化
		SubInitClass[] sc = new SubInitClass[10];
	}
}
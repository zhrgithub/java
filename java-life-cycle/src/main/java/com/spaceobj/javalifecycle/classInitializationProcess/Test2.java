package com.spaceobj.javalifecycle.classInitializationProcess;

class InitClass2{
	static{
		System.out.println("运行父类静态代码");
	}
	public static Field1 f1 = new Field1();
	public static Field1 f2;
	public InitClass2(){

		System.out.println("父类构造器！");
	}
}
 
class SubInitClass2 extends InitClass2{
	static{
		System.out.println("运行子类静态代码");
	}
	public static Field2 f2 = new Field2();
	public SubInitClass2(){

		System.out.println("子类构造器！");
	}
}
 
public class Test2 {
	public static void main(String[] args) throws ClassNotFoundException{
		new SubInitClass2();
	}
}
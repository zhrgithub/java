package com.company;

import java.io.*;

public class IOWriterReader {

    public static void main(String[] args) throws IOException {
        File f = new File("/Users/zhr/study/practice/demo/files/test.txt");

        // OutputStreamWriter 是字符流通向字节流的桥梁,创建了一个字符流通向字节流的对象
        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(f),"UTF-8");

        Writer writer = new BufferedWriter(osw);
        writer.write("我是字符流转换成字节流输出的");
        writer.flush();
        writer.close();
        osw.close();


        InputStreamReader reader = new InputStreamReader(new FileInputStream(f),"UTF-8");
        char[] buffer = new char[1024];
//

        BufferedReader bufferedReader = new BufferedReader(reader);

       String bufferString =  bufferedReader.readLine();
        System.out.println("bufferString:"+bufferString);
//        int len = bufferedReader.read(buffer);
//        System.out.println(new String(buffer,0,len));

        bufferedReader.close();
        reader.close();


        FileWriter fileWriter = new FileWriter(f,true);
        fileWriter.write("我草");
        fileWriter.close();
        FileReader flux = new FileReader(f);
        int lens = flux.read(buffer);
        System.out.println(new String(buffer,0,lens));
        flux.close();





    }

}

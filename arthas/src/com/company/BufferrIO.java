package com.company;

import java.io.*;

public class BufferrIO {
    public static void main(String[] args) throws IOException {
        InputStream inputStream = new FileInputStream("");
        BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);

        OutputStream outputStream = new FileOutputStream("",true);
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);

        int num = 0;
        while ((num = bufferedInputStream.read())!=-1){
            bufferedOutputStream.write(num);
        }
        inputStream.close();
        bufferedInputStream.close();
        outputStream.close();
        bufferedOutputStream.close();


    }
}

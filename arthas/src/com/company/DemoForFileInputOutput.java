package com.company;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class DemoForFileInputOutput {
    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("/Users/zhr/home/my/images/my.jpeg");
        FileOutputStream fos = new FileOutputStream("/Users/zhr/home/my/images/my3.jpeg",false);

        int size = 0;
        byte[] buffer = new byte[1024];
        while ((size = fis.read(buffer))!=-1){
            fos.write(buffer);
        }
        fis.close();
        fos.close();

//        OutputStreamWriter out = new OutputStreamWriter(fos,"");

    }
}

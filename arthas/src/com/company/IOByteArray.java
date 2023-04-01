package com.company;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;

public class IOByteArray {

    public static void main(String[] args) throws IOException {
        byte[] bytes = new byte[10];
        for (int i=0;i<10;i++){
            bytes[i] = Byte.parseByte(String.valueOf(i));
        }
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

        int num = -1;
        while((num = byteArrayInputStream.read())!=-1){
            System.out.print((byte) num+ " ");
        }

        System.out.println("");
        byteArrayInputStream.close();


        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byteArrayOutputStream.write(bytes);
        System.out.println(Arrays.toString(byteArrayOutputStream.toByteArray()));


        byteArrayOutputStream.close();


    }

}

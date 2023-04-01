package com.company;

import java.io.CharArrayReader;
import java.io.CharArrayWriter;
import java.io.IOException;

public class IOCharArray {
    public static void main(String[] args) throws IOException {

        char[] chars = {'a','b','c','d','e'};
//        for (int i=0;i<chars.length;i++){
//            chars[i] = (char) i;
//        }

        CharArrayWriter charArrayWriter = new CharArrayWriter();
        charArrayWriter.write(chars);


        CharArrayReader charArrayReader = new CharArrayReader(charArrayWriter.toCharArray());
        int len = 0;

        while ((len = charArrayReader.read())!=-1){
            System.out.println((char) len);
        }

        charArrayWriter.close();
        charArrayReader.close();


    }
}

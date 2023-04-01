package com.company;


import com.oracle.tools.packager.IOUtils;

import java.io.*;

public class ObjectIO implements Serializable {
    private static final long serialVersionUID = -5531221620783061171L;

    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("");
        ObjectInputStream ois = new ObjectInputStream(fis);


        FileOutputStream fileOutputStream = new FileOutputStream("");
        ObjectOutputStream oos = new ObjectOutputStream(fileOutputStream);

        ObjectInput objectInput;
        ObjectOutput objectOutput;

        Externalizable externalizable;


    }
}

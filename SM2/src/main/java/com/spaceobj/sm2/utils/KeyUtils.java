package com.spaceobj.sm2.utils;
 
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.security.*;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
 
/**
 * @author WangJing
 * @Description 国密公私钥对 工具类
 * @date 2021/11/24 16:10
 */
public class KeyUtils {
    public static final String EC_GEN_PARAMETER_SPEC = "sm2p256v1";
    public static final String EC = "EC";
 
    /**
     * 生成国密公私钥对
     *
     * @return
     * @throws Exception
     */
    public static String[] generateSmKey() throws Exception {
        KeyPairGenerator keyPairGenerator = null;
        SecureRandom secureRandom = new SecureRandom();
        ECGenParameterSpec sm2Spec = new ECGenParameterSpec(EC_GEN_PARAMETER_SPEC);
        keyPairGenerator = KeyPairGenerator.getInstance(EC, new BouncyCastleProvider());
        keyPairGenerator.initialize(sm2Spec);
        keyPairGenerator.initialize(sm2Spec, secureRandom);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        PrivateKey privateKey = keyPair.getPrivate();
        PublicKey publicKey = keyPair.getPublic();
        //String[0] 公钥
        //String[1] 私钥
        String[] result = {
                new String(Base64.getEncoder().encode(publicKey.getEncoded()))
                , new String(Base64.getEncoder().encode(privateKey.getEncoded()))
        };
        return result;
    }
 
    /**
     * 将Base64转码的公钥串，转化为公钥对象
     *
     * @param publicKey
     * @return
     */
    public static PublicKey createPublicKey(String publicKey) {
        PublicKey publickey = null;
        try {
            X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(Base64.getDecoder().decode(publicKey));
            KeyFactory keyFactory = KeyFactory.getInstance(EC, new BouncyCastleProvider());
            publickey = keyFactory.generatePublic(publicKeySpec);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return publickey;
    }
 
    /**
     * 将Base64转码的私钥串，转化为私钥对象
     *
     * @param privateKey
     * @return
     */
    public static PrivateKey createPrivateKey(String privateKey) {
        PrivateKey publickey = null;
        try {
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKey));
            KeyFactory keyFactory = KeyFactory.getInstance(EC, new BouncyCastleProvider());
            publickey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return publickey;
    }


}
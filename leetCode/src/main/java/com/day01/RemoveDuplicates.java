package com.day01;


/**
 * @author zhr_java@163.com
 * @date 2022/11/7 21:31
 */
public class RemoveDuplicates {
  public static int removeDuplicates(int[] nums) {
    int p = 0;
    for(int i=1;i<nums.length;i++){
      if(nums[p]!=nums[i]){
        p++;
        nums[p]=nums[i];
      }
    }
    return p+1;
  }

  public static void main(String[] args) {
    //
    int[] arr = {1,1,2};
    int arrSize = removeDuplicates(arr);
    int[] newArr = new int [arrSize];
    System.arraycopy(arr,0, newArr,0,arrSize );

  }
}

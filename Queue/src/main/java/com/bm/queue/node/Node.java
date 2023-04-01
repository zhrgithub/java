package com.bm.queue.node;

public class Node<T> {

    //存储的数据
    private T data;

    //下一个节点的引用
    private Node<T> next;

    public Node(T data) {
        this.data = data;
    }

    public T getData(){
        return data;
    }

    public void setData(T data){
        this.data = data;
    }

    public Node<T> getNext(){
        return next;
    }

    public void setNext(Node<T> next) {
        this.next = next;
    }
}

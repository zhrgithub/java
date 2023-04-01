package com.bm.queue.linkNode;

import com.bm.queue.node.Node;

public class LinkQueue<T> {

    // 队头
    public Node<T> front;

    // 队尾
    private Node<T> rear;

    // 元素个数
    private int size;

    /**
     * 创建队列
     */
    public LinkQueue(){
        front = rear = null;
    }

    public boolean isEmpty(){
        return (front==null && rear == null) ? true :false;
    }

    /**
     * 入队列
     *
     * @param data
     */
    public void enQueue(T data){
        Node<T> node = new Node<T>(data);
        if (isEmpty()){
            front = rear = node;
        }else {
            //设置下一个节点
            rear.setNext(node);
            System.out.println("rear"+rear.getNext().getData());
            //设置当前节点为最后一个节点，即rear指向最后一个节点
            rear = node;
            System.out.println("rear"+rear.getData());
            System.out.println("。。。。。。。。。。");

        }
        size++;
    }

    /**
     * 出队列
     *
     * @return 返回数据
     */
    public T deQueue(){
        if (isEmpty()){
            throw new RuntimeException("队列为空！");
        }
        //引用传递获取队首节点
        Node<T> delete = front;
        System.out.println("delete:"+delete.getData());
        //引用传递获取下一个节点，并赋值给队首
        front = delete.getNext();


        delete.setNext(null);//help gc
        size--;
        if (size == 0){
            // 删除掉最后一个元素时，front值已经为null，但rear还是指向该节点，需要将rear置为null
            // 最后一个结点front和rear两个引用都没指向它，帮助GC处理该节点对象
            rear = front;
        }
        return (T) delete.getData();
    }

    public int size(){
        return this.size;
    }

}

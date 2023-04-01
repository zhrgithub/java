package com.bm.queue;

import com.bm.queue.linkNode.LinkQueue;

public class DemoForQueue {

    public static void main(String[] args) {
        LinkQueue<Integer> linkQueue = new LinkQueue<>();

        linkQueue.enQueue(1);
        linkQueue.enQueue(2);
        linkQueue.enQueue(3);

        System.out.println("size: "+ linkQueue.size());

        System.out.println("出队列："+ linkQueue.deQueue());
        System.out.println("出队列："+ linkQueue.deQueue());
        System.out.println("出队列："+ linkQueue.deQueue());

    }
}

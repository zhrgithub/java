package com.attributeAssignMent;

/**
 * @author zhr_java@163.com
 * @date 2022/4/10 17:39
 */
public class Home {

    private String address;

    private Room room;

    @Override
    public String toString() {

        return "Home{" +
                "address='" + address + '\'' +
                ", room=" + room +
                '}';
    }

    public Room getRoom() {

        return room;
    }

    public void setRoom(Room room) {

        this.room = room;
    }

    public String getAddress() {

        return address;
    }

    public void setAddress(String address) {

        this.address = address;
    }

}

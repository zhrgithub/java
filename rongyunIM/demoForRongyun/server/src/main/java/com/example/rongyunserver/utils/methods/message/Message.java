package com.example.rongyunserver.utils.methods.message;

import com.example.rongyunserver.utils.RongCloud;
import com.example.rongyunserver.utils.methods.message._private.Private;
import com.example.rongyunserver.utils.methods.message.chatroom.Chatroom;
import com.example.rongyunserver.utils.methods.message.discussion.Discussion;
import com.example.rongyunserver.utils.methods.message.group.Group;
import com.example.rongyunserver.utils.methods.message.history.History;
import com.example.rongyunserver.utils.methods.message.system.MsgSystem;


public class Message {

	private static final String UTF8 = "UTF-8";
	private static final String PATH = "message";
	private static String method = "";
	private String appKey;
	private String appSecret;
	public  Private msgPrivate;
	public  Chatroom chatroom;
	public  Discussion discussion;
	public  Group group;
	public  History history;
	public  MsgSystem system;
	private RongCloud rongCloud;

	public RongCloud getRongCloud() {
		return rongCloud;
	}

	public void setRongCloud(RongCloud rongCloud) {
		this.rongCloud = rongCloud;
		msgPrivate.setRongCloud(this.getRongCloud());
		chatroom.setRongCloud(this.getRongCloud());
		discussion.setRongCloud(this.getRongCloud());
		group.setRongCloud(this.getRongCloud());
		history.setRongCloud(this.getRongCloud());
		system.setRongCloud(this.getRongCloud());

	}
	public Message(String appKey, String appSecret) {
		this.appKey = appKey;
		this.appSecret = appSecret;
		this.msgPrivate = new Private(appKey,appSecret);
		this.chatroom = new Chatroom(appKey,appSecret);
		this.discussion = new Discussion(appKey,appSecret);
		this.group = new Group(appKey,appSecret);
		this.history = new History(appKey,appSecret);
		this.system = new MsgSystem(appKey,appSecret);

	}
	 
}
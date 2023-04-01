package com.example.rongyunserver.utils.messages;

import com.example.rongyunserver.utils.util.GsonUtil;

public class SightMessage extends BaseMessage {

	private String content = "";
	private String extra = "";
	private Long duration = 0L;
	private Long size = 0L;
	private String name = "";
	private String sightUrl = "";
	private transient static final String TYPE = "RC:SightMsg";

	
	public SightMessage() {
		super();
	}

	public SightMessage(String content, String extra, Long duration, Long size, String name, String sightUrl) {
		super();
		this.content = content;
		this.extra = extra;
		this.duration = duration;
		this.size = size;
		this.name = name;
		this.sightUrl = sightUrl;
	}


	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getExtra() {
		return extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSightUrl() {
		return sightUrl;
	}

	public void setSightUrl(String sightUrl) {
		this.sightUrl = sightUrl;
	}

	@Override
	public String getType() {
		return TYPE;
	}

	@Override
	public String toString() {
		return GsonUtil.toJson(this, SightMessage.class);
	}

}

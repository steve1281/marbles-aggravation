package com.sfalcigno.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.annotation.Generated;

public class MessageBroadcast{

	@JsonProperty("broadcast")
	private int broadcast;

	@JsonProperty("messages")
	private List<Message> messages;

	public void setBroadcast(int broadcast){
		this.broadcast = broadcast;
	}

	public int getBroadcast(){
		return broadcast;
	}

	public void setMessages(List<Message> messages){
		this.messages = messages;
	}

	public List<Message> getMessages(){
		return messages;
	}

	@Override
 	public String toString(){
		return 
			"MessageBroadcast{" + 
			"broadcast = '" + broadcast + '\'' + 
			",messages = '" + messages + '\'' + 
			"}";
		}
}
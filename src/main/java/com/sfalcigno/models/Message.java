package com.sfalcigno.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message{

	@JsonProperty("player_id")
	private int playerId;

	@JsonProperty("message")
	private String message;

	public void setPlayerId(int playerId){
		this.playerId = playerId;
	}

	public int getPlayerId(){
		return playerId;
	}

	public void setMessage(String message){
		this.message = message;
	}

	public String getMessage(){
		return message;
	}

	@Override
 	public String toString(){
		return 
			"Message{" + 
			"player_id = '" + playerId + '\'' + 
			",message = '" + message + '\'' + 
			"}";
		}
}
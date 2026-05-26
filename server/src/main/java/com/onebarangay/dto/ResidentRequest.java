package com.onebarangay.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResidentRequest {

    private String fullName;
    private int age;
    private String civilStatus;
    private String address;

    @JsonProperty("registeredVoter")
    private boolean registeredVoter;

    public ResidentRequest() {}


    // constructor
    public ResidentRequest(String fullName, int age, String civilStatus, String address, boolean registeredVoter){
        this.fullName = fullName;
        this.age = age;
        this.civilStatus = civilStatus;
        this.address = address;
        this.registeredVoter = registeredVoter;
    }

    // setters
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCivilStatus(String civilStatus) {
        this.civilStatus = civilStatus;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setRegisteredVoter(boolean registeredVoter) {
        this.registeredVoter = registeredVoter;
    }


    // getters
    public String getFullName() {
        return fullName;
    }

    public int getAge() {
        return age;
    }

    public String getCivilStatus() {
        return civilStatus;
    }

    public String getAddress() {
        return address;
    }

    @JsonProperty("registeredVoter")
    public boolean registeredVoter() {
        return registeredVoter;
    }
}
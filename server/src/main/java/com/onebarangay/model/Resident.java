package com.onebarangay.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "residents")
public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private int age;
    private String civilStatus;
    private String address;

    @JsonProperty("registeredVoter")
    private boolean registeredVoter;

    public Resident() {}


    // constructor
    public Resident(String fullName, int age, String civilStatus, String address, boolean registeredVoter) {
        this.fullName = fullName;
        this.age = age;
        this.civilStatus = civilStatus;
        this.address = address;
        this.registeredVoter = registeredVoter;
    }


    // setters
    public void setId(Long id) {
        this.id = id;
    }

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

    @JsonProperty("registeredVoter")
    public void setRegisteredVoter(boolean registeredVoter) {
        this.registeredVoter = registeredVoter;
    }

    
    // getters
    public Long getId() {
         return id;
    }

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

    public boolean isRegisteredVoter() { 
        return registeredVoter; 
    }
}
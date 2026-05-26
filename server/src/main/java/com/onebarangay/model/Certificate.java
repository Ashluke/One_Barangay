package com.onebarangay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private int age;
    private String civilStatus;
    private double income;

    public Certificate() {}

    public Certificate(String fullName, int age, String civilStatus, double income) {
        this.fullName = fullName;
        this.age = age;
        this.civilStatus = civilStatus;
        this.income = income;
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

    public void setIncome(double income) {
        this.income = income;
    }

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

    public double getIncome() {
        return income;
    }
}
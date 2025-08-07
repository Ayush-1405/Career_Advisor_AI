<<<<<<< HEAD
package com.advisor.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "career_paths")
public class CareerPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String skillsRequired;

    private String averageSalary;

    private String jobOpportunities;

    // Constructors
    public CareerPath() {
    }

    public CareerPath(String title, String description, String skillsRequired, String averageSalary, String jobOpportunities) {
        this.title = title;
        this.description = description;
        this.skillsRequired = skillsRequired;
        this.averageSalary = averageSalary;
        this.jobOpportunities = jobOpportunities;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public String getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(String averageSalary) {
        this.averageSalary = averageSalary;
    }

    public String getJobOpportunities() {
        return jobOpportunities;
    }

    public void setJobOpportunities(String jobOpportunities) {
        this.jobOpportunities = jobOpportunities;
    }
}
=======
package com.advisor.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "career_paths")
public class CareerPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String skillsRequired;

    private String averageSalary;

    private String jobOpportunities;

    // Constructors
    public CareerPath() {
    }

    public CareerPath(String title, String description, String skillsRequired, String averageSalary, String jobOpportunities) {
        this.title = title;
        this.description = description;
        this.skillsRequired = skillsRequired;
        this.averageSalary = averageSalary;
        this.jobOpportunities = jobOpportunities;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public String getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(String averageSalary) {
        this.averageSalary = averageSalary;
    }

    public String getJobOpportunities() {
        return jobOpportunities;
    }

    public void setJobOpportunities(String jobOpportunities) {
        this.jobOpportunities = jobOpportunities;
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca

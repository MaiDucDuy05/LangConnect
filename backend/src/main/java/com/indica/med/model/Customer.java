package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import com.indica.med.dto.CustomerDto;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("CUSTOMER")
public class Customer extends User {

    @Column(nullable = true)
    private LocalDate dob; // Customer's Date of Birth

    @Column(nullable = true, length = 10)
    private String gender; // Customer's gender (e.g., Male, Female, Other)

    @OneToMany(mappedBy = "customer", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = false, fetch = FetchType.LAZY)
    private List<Order> orders; // Orders remain even if customer is deleted

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Rating> ratings; // Ratings are removed when customer is deleted

    public CustomerDto getCustomerDto() {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(this.getId()); // Inherited from User
        customerDto.setName(this.getName()); // Inherited from User
        customerDto.setEmail(this.getEmail()); // Inherited from User
        customerDto.setPhoneNumber(this.getPhoneNumber()); // Inherited from User
        customerDto.setAddress(this.getAddress()); // Inherited from User
        customerDto.setProfilePic(this.getProfilePic()); // Inherited from User
        customerDto.setDob(this.dob);
        customerDto.setGender(this.gender);
        return customerDto;
    }
}
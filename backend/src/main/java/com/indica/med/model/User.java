package com.indica.med.model;

import com.indica.med.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "app_user")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)  // Single Table Inheritance
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(nullable = true, length = 15)
    private String phoneNumber; // User's phone number

    @Column(nullable = true, length = 255)
    private String address; // User's address

    @Column(nullable = true)
    private String profilePic; // URL or path to the user's profile picture

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "subscription_id", nullable = true)
    private Subscription subscription; // The subscription plan for the user

    @Column(nullable = true)
    private LocalDate subscriptionStartDate; // Start date of the subscription

    @Column(nullable = true)
    private LocalDate subscriptionEndDate; // End date of the subscription (nullable for ongoing subscriptions)

    @Column(nullable = true, columnDefinition = "TEXT")
    private String description;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
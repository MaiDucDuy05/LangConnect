package com.indica.med.service.auth;

import com.indica.med.model.*;
import com.indica.med.repository.SpecializationRepository;
import org.mapstruct.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.indica.med.dto.UserDto;
import com.indica.med.dto.auth.BusinessUserSUR;
import com.indica.med.dto.auth.CustomerSUR;
import com.indica.med.enums.BusinessType;
import com.indica.med.enums.UserRole;
import com.indica.med.mapper.BusinessUserMapper;
import com.indica.med.mapper.CustomerMapper;
import com.indica.med.mapper.UserMapper;
import com.indica.med.repository.UserRepository;
import com.indica.med.service.user.UserService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final CustomerMapper customerMapper;
    private final BusinessUserMapper businessUserMapper;

    @Autowired
    private SpecializationRepository specializationRepository;

    @Override
    public UserDto signUpCustomer(CustomerSUR signUpRequest) {
        Customer user = new Customer();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);
        user.setDob(signUpRequest.getDob());
        user.setGender(signUpRequest.getGender());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setAddress(signUpRequest.getAddress());
        user.setProfilePic(signUpRequest.getProfilePic());

        User createdUser = userRepository.save(user);
        return customerMapper.toDto(createdUser);
    }

    @Override
    public UserDto signUpBusinessUser(BusinessUserSUR signUpRequest) {
        BusinessUser user = new BusinessUser();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));
        user.setUserRole(UserRole.BUSINESS);
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setAddress(signUpRequest.getAddress());
        user.setProfilePic(signUpRequest.getProfilePic());

        // Business-specific fields
        user.setDescription(signUpRequest.getDescription());
        user.setBusinessType(signUpRequest.getBusinessType());
        user.setDayStarted(signUpRequest.getDayStarted());
        user.setExperience(signUpRequest.getExperience());

        // Specializations (ManyToMany)
        // Handle Specializations (ManyToMany)
        Set<Specialization> selectedSpecializations = signUpRequest.getSpecializations()
                .stream()
                .map(spec -> specializationRepository.findById(spec.getId())
                        .orElseThrow(() -> new RuntimeException("Specialization not found with ID: " + spec.getId())))
                .collect(Collectors.toSet());

        user.setSpecializations(selectedSpecializations);
        // Quan hệ hai chiều (nếu cần thiết)
        for (Specialization specialization : selectedSpecializations) {
            specialization.getUsers().add(user);
        }

        // Degrees - OneToMany (needs owner set)
        List<Degree> degrees = signUpRequest.getDegrees();
        if (degrees != null) {
            for (Degree degree : degrees) {
                degree.setBusinessUser(user);
            }
        }
        user.setDegrees(degrees);

        // Herbal Medicines
        List<HerbalMedicine> medicines = signUpRequest.getHerbalMedicines();
        if (medicines != null) {
            for (HerbalMedicine med : medicines) {
                med.setBusinessUser(user);
            }
        }
        user.setHerbalMedicines(medicines);

        // Clinic Photos
        List<ClinicPhoto> photos = signUpRequest.getClinicPhotos();
        if (photos != null) {
            for (ClinicPhoto photo : photos) {
                photo.setBusinessUser(user);
            }
        }
        user.setClinicPhotos(photos);

        // Save user
        BusinessUser createdUser = userRepository.save(user);
        return businessUserMapper.toDto(createdUser);
    }


    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}


package com.indica.med.service.user;


import com.indica.med.dto.BusinessUserDto;
import com.indica.med.dto.ClinicPhotoDto;
import com.indica.med.dto.HerbalMedicineDto;
import com.indica.med.dto.UserDto;
import com.indica.med.dto.auth.BusinessUserSUR;
import com.indica.med.enums.BusinessType;
import com.indica.med.enums.UserRole;
import com.indica.med.mapper.*;
import com.indica.med.model.*;
import com.indica.med.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final  UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final BusinessUserRepository businessUserRepository;
    private final DegreeRepository degreeRepository;
    private final HerbalMedicineRepository herbalMedicineRepository;
    private final ClinicPhotoRepository clinicPhotoRepository;


    private final CustomerMapper customerMapper;
    private final BusinessUserMapper businessUserMapper;
    private final DegreeMapper degreeMapper;
    private final SpecializationMapper specializationMapper;
    private final ClinicPhotoMapper clinicPhotoMapper;
    private final HerbalMedicineMapper herbalMedicineMapper;







    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public UserDto getCustomerById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return customerMapper.toDto(user);
    }

    @Override
    public UserDto updateCustomerById(Long id, UserDto userDto){
        userRepository.updateCustomerFieldsById(
                id,
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPhoneNumber(),
                userDto.getAddress(),
                userDto.getDescription()
        );
        return userDto;
    }

    @Override
    public List<UserDto> getAllCustomers() {
        List<User> customers = userRepository.findByUserRole(UserRole.CUSTOMER);
        return customers.stream()
                .map(user -> customerMapper.toDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public List<BusinessUserDto> getAllBusiness(BusinessType businessType) {
        // Truy vấn tất cả BusinessUser theo BusinessType
        List<BusinessUser> businessUsers = businessUserRepository.findByBusinessType(businessType);

        // Lọc và chuyển đổi sang BusinessUserDto
        return businessUsers.stream()
                .map(user -> {
                    // Chuyển BusinessUser thành BusinessUserDto
                    BusinessUserDto dto = new BusinessUserDto();
                    dto.setId(user.getId());
                    dto.setEmail(user.getEmail());
                    dto.setPhoneNumber(user.getPhoneNumber());
                    dto.setAddress(user.getAddress());
                    dto.setProfilePic(user.getProfilePic());
                    dto.setDescription(user.getDescription());
                    dto.setDayStarted(user.getDayStarted());
                    dto.setName(user.getName());
                    dto.setExperience(user.getExperience());

                    // Lấy thông tin Specializations (ManyToMany)
                    Set<Specialization> specializations = user.getSpecializations();
                    dto.setSpecializations(specializations.stream()
                                    .map(specialization ->specializationMapper.toDto(specialization) )
                            .collect(Collectors.toSet()));

                    // Lấy thông tin Degrees (OneToMany)
                    List<Degree> degrees = degreeRepository.findByBusinessUser(user);
                    dto.setDegrees(degrees.stream()
                                    .map(degree -> degreeMapper.toDto(degree))
                            .collect(Collectors.toList()));

                    List<HerbalMedicine> herbalMedicines = herbalMedicineRepository.findByBusinessUser(user);  // Truy vấn HerbalMedicine qua BusinessUser
                    dto.setHerbalMedicines(herbalMedicines.stream()
                                    .map(herbalMedicine -> herbalMedicineMapper.toDto(herbalMedicine))
                            .collect(Collectors.toList()));

//                    // Lấy thông tin ClinicPhotos (OneToMany)
                    List<ClinicPhoto> clinicPhotos = clinicPhotoRepository.findByBusinessUser(user);  // Truy vấn ClinicPhoto qua BusinessUser
                    dto.setClinicPhotos(clinicPhotos.stream()
                                    .map(clinicPhoto -> clinicPhotoMapper.toDto(clinicPhoto))
                            .collect(Collectors.toList()));

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public BusinessUserDto getBusinessById(Long id) {
        BusinessUser businessUser = businessUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng với id: " + id));

        BusinessUserDto dto = new BusinessUserDto();
        dto.setId(businessUser.getId());
        dto.setEmail(businessUser.getEmail());
        dto.setPhoneNumber(businessUser.getPhoneNumber());
        dto.setAddress(businessUser.getAddress());
        dto.setProfilePic(businessUser.getProfilePic());
        dto.setDescription(businessUser.getDescription());
        dto.setDayStarted(businessUser.getDayStarted());
        dto.setName(businessUser.getName());
        dto.setExperience(businessUser.getExperience());

        // Specializations
        Set<Specialization> specializations = businessUser.getSpecializations();
        dto.setSpecializations(specializations.stream()
                .map(specializationMapper::toDto)
                .collect(Collectors.toSet()));

        // Degrees
        List<Degree> degrees = degreeRepository.findByBusinessUser(businessUser);
        dto.setDegrees(degrees.stream()
                .map(degreeMapper::toDto)
                .collect(Collectors.toList()));

        // Herbal Medicines
        List<HerbalMedicine> herbalMedicines = herbalMedicineRepository.findByBusinessUser(businessUser);
        dto.setHerbalMedicines(herbalMedicines.stream()
                .map(herbalMedicineMapper::toDto)
                .collect(Collectors.toList()));

        // Clinic Photos
        List<ClinicPhoto> clinicPhotos = clinicPhotoRepository.findByBusinessUser(businessUser);
        dto.setClinicPhotos(clinicPhotos.stream()
                .map(clinicPhotoMapper::toDto)
                .collect(Collectors.toList()));

        return dto;
    }


}

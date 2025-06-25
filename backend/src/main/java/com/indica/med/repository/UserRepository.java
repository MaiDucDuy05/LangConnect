package com.indica.med.repository;

import com.indica.med.enums.UserRole;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    List<User> findByNameContainingIgnoreCase(String name);

    boolean existsByEmail(String email);

    // Cập nhật thông tin người dùng
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.name = :name, u.email = :email, u.phoneNumber = :phoneNumber, u.address = :address, u.description = :description WHERE u.id = :id")
    int updateCustomerFieldsById(Long id, String name, String email, String phoneNumber, String address, String description);

    // Xóa người dùng theo ID (đã có sẵn, nhưng ghi rõ nếu cần)
    void deleteById(Long id);

    List<User> findByUserRole(UserRole role);

    @Query("SELECT b FROM BusinessUser b WHERE b.userRole = :role")
    List<BusinessUser> findBusinessUsersByRole(@Param("role") UserRole role);
}
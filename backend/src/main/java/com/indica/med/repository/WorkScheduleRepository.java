package com.indica.med.repository;

import com.indica.med.model.WorkSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkScheduleRepository extends JpaRepository<WorkSchedule, Long> {

    // Find all work schedules for a specific user
    List<WorkSchedule> findByBusinessUserId(Long userId);


    // Find all work schedules within a specific time range
    List<WorkSchedule> findByStartTimeBetween(LocalDateTime startTime, LocalDateTime endTime);

    // Find all work schedules for a specific user within a specific time range
    List<WorkSchedule> findByBusinessUserIdAndStartTimeBetween(Long userId, LocalDateTime startTime, LocalDateTime endTime);

}
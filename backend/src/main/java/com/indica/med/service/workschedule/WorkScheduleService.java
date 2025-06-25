package com.indica.med.service.workschedule;

import com.indica.med.dto.WorkScheduleDto;
import java.time.LocalDateTime;
import java.util.List;

public interface WorkScheduleService {

    // Tạo mới lịch làm việc
    WorkScheduleDto createWorkSchedule(WorkScheduleDto workScheduleDto);

    // Cập nhật lịch làm việc
    WorkScheduleDto updateWorkSchedule(Long id, WorkScheduleDto workScheduleDto);

    // Xóa lịch làm việc
    void deleteWorkSchedule(Long id);

    // Lấy lịch làm việc theo ID
    WorkScheduleDto getWorkScheduleById(Long id);

    // Lấy tất cả lịch làm việc của một người dùng
    List<WorkScheduleDto> getWorkSchedulesByUserId(Long userId);

    // Tìm kiếm lịch làm việc trong một khoảng thời gian
    List<WorkScheduleDto> getWorkSchedulesInTimeRange(LocalDateTime startTime, LocalDateTime endTime);

    // Lấy lịch làm việc của một người dùng trong một khoảng thời gian
    List<WorkScheduleDto> getWorkSchedulesByUserIdAndTimeRange(Long userId, LocalDateTime startTime, LocalDateTime endTime);
}

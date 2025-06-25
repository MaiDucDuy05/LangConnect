package com.indica.med.controller;

import com.indica.med.dto.WorkScheduleDto;
import com.indica.med.service.workschedule.WorkScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/work-schedules")
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    // ====== Lấy lịch làm việc theo ID ======
    @GetMapping("/{id}")
    public ResponseEntity<WorkScheduleDto> getWorkScheduleById(@PathVariable Long id) {
        WorkScheduleDto workScheduleDto = workScheduleService.getWorkScheduleById(id);
        return ResponseEntity.ok(workScheduleDto);
    }

    // ====== Tạo mới lịch làm việc ======
    @PostMapping
    public ResponseEntity<WorkScheduleDto> createWorkSchedule(@RequestBody WorkScheduleDto workScheduleDto) {
        WorkScheduleDto createdWorkSchedule = workScheduleService.createWorkSchedule(workScheduleDto);
        return ResponseEntity.ok(createdWorkSchedule);
    }

    // ====== Cập nhật lịch làm việc ======
    @PutMapping("/{id}")
    public ResponseEntity<WorkScheduleDto> updateWorkSchedule(@PathVariable Long id, @RequestBody WorkScheduleDto workScheduleDto) {
        WorkScheduleDto updatedWorkSchedule = workScheduleService.updateWorkSchedule(id, workScheduleDto);
        return ResponseEntity.ok(updatedWorkSchedule);
    }

    // ====== Xóa lịch làm việc ======
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkSchedule(@PathVariable Long id) {
        workScheduleService.deleteWorkSchedule(id);
        return ResponseEntity.noContent().build();
    }

    // ====== Lấy tất cả lịch làm việc của một người dùng ======
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkScheduleDto>> getWorkSchedulesByUserId(@PathVariable Long userId) {
        List<WorkScheduleDto> workSchedules = workScheduleService.getWorkSchedulesByUserId(userId);
        return ResponseEntity.ok(workSchedules);
    }

    // ====== Lấy lịch làm việc trong một khoảng thời gian ======
    @GetMapping("/time-range")
    public ResponseEntity<List<WorkScheduleDto>> getWorkSchedulesInTimeRange(
            @RequestParam LocalDateTime startTime,
            @RequestParam LocalDateTime endTime) {

        List<WorkScheduleDto> workSchedules = workScheduleService.getWorkSchedulesInTimeRange(startTime, endTime);
        return ResponseEntity.ok(workSchedules);
    }

    // ====== Lấy lịch làm việc của người dùng trong một khoảng thời gian ======
    @GetMapping("/user/{userId}/time-range")
    public ResponseEntity<List<WorkScheduleDto>> getWorkSchedulesByUserIdAndTimeRange(
            @PathVariable Long userId,
            @RequestParam LocalDateTime startTime,
            @RequestParam LocalDateTime endTime) {

        List<WorkScheduleDto> workSchedules = workScheduleService.getWorkSchedulesByUserIdAndTimeRange(userId, startTime, endTime);
        return ResponseEntity.ok(workSchedules);
    }
}

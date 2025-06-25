package com.indica.med.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalDateTime;

import com.indica.med.dto.WorkScheduleDto;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class WorkSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING) // Lưu ngày trong tuần dưới dạng String
    @Column(nullable = false)
    private DayOfWeek dayOfWeek; // Ngày trong tuần (e.g., MONDAY, TUESDAY)

    @Column(nullable = false)
    private LocalDateTime startTime; // Giờ bắt đầu của lịch làm việc

    @Column(nullable = false)
    private LocalDateTime endTime; // Giờ kết thúc của lịch làm việc

    @Column(nullable = false, length = 100)
    private String description; // Mô tả về lịch làm việc

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private BusinessUser businessUser; // Người dùng liên quan đến lịch làm việc

}

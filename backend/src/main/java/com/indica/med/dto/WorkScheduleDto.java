package com.indica.med.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class WorkScheduleDto {

    private Long id; // Unique identifier for the work schedule
    private String dayOfWeek; // Day of the week (e.g., MONDAY, TUESDAY)
    private LocalDateTime startTime; // Start time of the work schedule
    private LocalDateTime endTime; // End time of the work schedule
    private String description; // Description of the work schedule
    private Long userId; // ID of the user associated with the work schedule
    private String userName; // Name of the user associated with the work schedule
}
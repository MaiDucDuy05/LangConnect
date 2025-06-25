package com.indica.med.service.workschedule;

import com.indica.med.dto.WorkScheduleDto;
import com.indica.med.mapper.WorkScheduleMapper;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.WorkSchedule;
import com.indica.med.repository.BusinessUserRepository;
import com.indica.med.repository.WorkScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkScheduleServiceIplm implements WorkScheduleService {

    private final WorkScheduleRepository workScheduleRepository;
    private final WorkScheduleMapper workScheduleMapper;
    private final BusinessUserRepository businessUserRepository;

    @Override
    public WorkScheduleDto createWorkSchedule(WorkScheduleDto workScheduleDto) {
        WorkSchedule workSchedule = workScheduleMapper.toEntity(workScheduleDto);
        workSchedule = workScheduleRepository.save(workSchedule);
        return workScheduleMapper.toDto(workSchedule);
    }

    @Override
    public WorkScheduleDto updateWorkSchedule(Long id, WorkScheduleDto dto) {
        WorkSchedule workSchedule = workScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work schedule not found"));
        workScheduleMapper.updateFromDto(workSchedule, dto);

        if (dto.getUserId() != null) {
            BusinessUser businessUser = businessUserRepository.getReferenceById(dto.getUserId());
            workSchedule.setBusinessUser(businessUser);
        }

            workSchedule = workScheduleRepository.save(workSchedule);
        return workScheduleMapper.toDto(workSchedule);
    }

    @Override
    public void deleteWorkSchedule(Long id) {
        if (!workScheduleRepository.existsById(id)) {
            throw new RuntimeException("Work schedule not found");
        }
        workScheduleRepository.deleteById(id);
    }

    @Override
    public WorkScheduleDto getWorkScheduleById(Long id) {
        WorkSchedule workSchedule = workScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work schedule not found"));
        return workScheduleMapper.toDto(workSchedule);
    }

    @Override
    public List<WorkScheduleDto> getWorkSchedulesByUserId(Long userId) {
        List<WorkSchedule> workSchedules = workScheduleRepository.findByBusinessUserId(userId);
        return workSchedules.stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<WorkScheduleDto> getWorkSchedulesInTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        List<WorkSchedule> workSchedules = workScheduleRepository.findByStartTimeBetween(startTime, endTime);
        return workSchedules.stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<WorkScheduleDto> getWorkSchedulesByUserIdAndTimeRange(Long userId, LocalDateTime startTime, LocalDateTime endTime) {
        List<WorkSchedule> workSchedules = workScheduleRepository.findByBusinessUserIdAndStartTimeBetween(userId, startTime, endTime);
        return workSchedules.stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
    }
}

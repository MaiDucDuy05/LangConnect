package com.indica.med.service.appointment;

import com.indica.med.dto.AppointmentDto;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentService {

    // Create a new appointment
    AppointmentDto createAppointment(AppointmentDto appointmentDto);

    // Get an appointment by its ID
    AppointmentDto getAppointmentById(Long id);

    // Update an existing appointment
    AppointmentDto updateAppointment(Long id, AppointmentDto appointmentDto);

    // Delete an appointment by its ID
    void deleteAppointment(Long id);

    // Get all appointments for a specific customer
    List<AppointmentDto> getAppointmentsByCustomerId(Long customerId);

    // Get all appointments for a specific business user
    List<AppointmentDto> getAppointmentsByBusinessUserId(Long businessUserId);

    // Get all appointments within a specific date range
    List<AppointmentDto> getAppointmentsByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    // Change the status of an appointment
    AppointmentDto changeAppointmentStatus(Long id, String status);
}
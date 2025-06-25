package com.indica.med.controller;

import com.indica.med.dto.AppointmentDto;
import com.indica.med.service.appointment.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Create a new appointment
    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        AppointmentDto createdAppointment = appointmentService.createAppointment(appointmentDto);
        return ResponseEntity.ok(createdAppointment);
    }

    // Get an appointment by its ID
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable Long id) {
        AppointmentDto appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }

    // Update an existing appointment
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDto appointmentDto) {
        AppointmentDto updatedAppointment = appointmentService.updateAppointment(id, appointmentDto);
        return ResponseEntity.ok(updatedAppointment);
    }

    // Delete an appointment by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    // Get all appointments for a specific customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByCustomerId(@PathVariable Long customerId) {
        List<AppointmentDto> appointments = appointmentService.getAppointmentsByCustomerId(customerId);
        return ResponseEntity.ok(appointments);
    }

    // Get all appointments for a specific business user
    @GetMapping("/business/{businessUserId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByBusinessUserId(@PathVariable Long businessUserId) {
        List<AppointmentDto> appointments = appointmentService.getAppointmentsByBusinessUserId(businessUserId);
        return ResponseEntity.ok(appointments);
    }

    // Get all appointments within a specific date range
    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDateRange(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {
        List<AppointmentDto> appointments = appointmentService.getAppointmentsByDateRange(
                LocalDateTime.parse(startDate), LocalDateTime.parse(endDate));
        return ResponseEntity.ok(appointments);
    }
}
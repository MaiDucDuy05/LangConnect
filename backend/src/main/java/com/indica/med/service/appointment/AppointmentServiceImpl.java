package com.indica.med.service.appointment;

import com.indica.med.dto.AppointmentDto;
import com.indica.med.enums.AppointmentStatus;
import com.indica.med.mapper.AppointmentMapper;
import com.indica.med.model.Appointment;
import com.indica.med.model.BusinessUser;
import com.indica.med.model.Customer;
import com.indica.med.repository.AppointmentRepository;
import com.indica.med.repository.BusinessUserRepository;
import com.indica.med.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final CustomerRepository customerRepository;
    private final BusinessUserRepository businessUserRepository;

    @Override
    public AppointmentDto createAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = appointmentMapper.toEntity(appointmentDto);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return appointmentMapper.toDto(savedAppointment);
    }

    @Override
    public AppointmentDto getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return appointmentMapper.toDto(appointment);
    }

    @Override
    public AppointmentDto updateAppointment(Long id, AppointmentDto appointmentDto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointmentMapper.updateFromDto(appointmentDto, appointment);

        if (appointmentDto.getCustomerId() != null) {
            Customer customer = customerRepository.getReferenceById(appointmentDto.getCustomerId());
            appointment.setCustomer(customer);
        }

        if (appointmentDto.getBusinessUserId() != null) {
            BusinessUser user = businessUserRepository.getReferenceById(appointmentDto.getBusinessUserId());
            appointment.setBusinessUser(user);
        }

        appointment = appointmentRepository.save(appointment);
        return appointmentMapper.toDto(appointment);
    }


    @Override
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<AppointmentDto> getAppointmentsByCustomerId(Long customerId) {
        List<Appointment> appointments = appointmentRepository.findByCustomerId(customerId);
        return appointments.stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<AppointmentDto> getAppointmentsByBusinessUserId(Long businessUserId) {
        List<Appointment> appointments = appointmentRepository.findByBusinessUserId(businessUserId);
        return appointments.stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDto> getAppointmentsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Appointment> appointments = appointmentRepository.findByAppointmentDateBetween(startDate, endDate);
        return appointments.stream()
                .map(appointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentDto changeAppointmentStatus(Long id, String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(AppointmentStatus.valueOf(status));
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return appointmentMapper.toDto(updatedAppointment);
    }
}
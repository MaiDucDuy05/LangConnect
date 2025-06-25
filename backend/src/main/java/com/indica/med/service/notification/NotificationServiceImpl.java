 package com.indica.med.service.notification;

 import com.indica.med.dto.NotificationDto;
 import com.indica.med.mapper.NotificationMapper;
 import com.indica.med.model.Notification;
 import com.indica.med.repository.NotificationRepository;
 import lombok.RequiredArgsConstructor;
 import org.springframework.stereotype.Service;

 import java.util.List;
 import java.util.stream.Collectors;

 @Service
 @RequiredArgsConstructor
 public class NotificationServiceImpl implements NotificationService {

     private final NotificationRepository notificationRepository;
     private final NotificationMapper notificationMapper;

     @Override
     public NotificationDto createNotification(NotificationDto notificationDto) {
         Notification notification = notificationMapper.toEntity(notificationDto);
         Notification savedNotification = notificationRepository.save(notification);
         return notificationMapper.toDto(savedNotification);
     }

     @Override
     public NotificationDto getNotificationById(Long id) {
         Notification notification = notificationRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Notification not found"));
         return notificationMapper.toDto(notification);
     }

     @Override
     public List<NotificationDto> getNotificationsByUserId(Long userId) {
         List<Notification> notifications = notificationRepository.findByUserId(userId);
         return notifications.stream()
                 .map(notificationMapper::toDto)
                 .collect(Collectors.toList());
     }

     @Override
     public NotificationDto markAsRead(Long id) {
         Notification notification = notificationRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Notification not found"));
         notification.setIsRead(true);
         Notification updatedNotification = notificationRepository.save(notification);
         return notificationMapper.toDto(updatedNotification);
     }

     @Override
     public void deleteNotification(Long id) {
         if (!notificationRepository.existsById(id)) {
             throw new RuntimeException("Notification not found");
         }
         notificationRepository.deleteById(id);
     }
 }

package com.indica.med.controller;

import com.indica.med.dto.MessageDto;
import com.indica.med.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    // ====== Lấy message theo ID ======
    @GetMapping("/{id}")
    public ResponseEntity<MessageDto> getMessageById(@PathVariable Long id) {
        MessageDto messageDto = messageService.getMessageById(id);
        return ResponseEntity.ok(messageDto);
    }

    // ====== Gửi tin nhắn mới ======
    @PostMapping
    public ResponseEntity<MessageDto> sendMessage(@RequestBody MessageDto messageDto) {
        MessageDto sentMessage = messageService.sendMessage(messageDto);
        return ResponseEntity.ok(sentMessage);  // Trả về 201 CREATED khi gửi thành công
    }

    // ====== Cập nhật tin nhắn ======
    @PutMapping("/{id}")
    public ResponseEntity<MessageDto> updateMessage(@PathVariable Long id, @RequestBody MessageDto messageDto) {
        MessageDto updatedMessage = messageService.updateMessage(id, messageDto);
        return ResponseEntity.ok(updatedMessage);
    }

    // ====== Xóa tin nhắn ======
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();  // Trả về 204 No Content khi xóa thành công
    }

    // ====== Lấy tất cả tin nhắn của người gửi theo senderId ======
    @GetMapping("/sender/{senderId}")
    public ResponseEntity<List<MessageDto>> getMessagesBySenderId(@PathVariable Long senderId) {
        List<MessageDto> messages = messageService.getMessagesBySenderId(senderId);
        return ResponseEntity.ok(messages);
    }

    // ====== Lấy tất cả tin nhắn của người nhận theo receiverId ======
    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<MessageDto>> getMessagesByReceiverId(@PathVariable Long receiverId) {
        List<MessageDto> messages = messageService.getMessagesByReceiverId(receiverId);
        return ResponseEntity.ok(messages);
    }

    // ====== Lấy tin nhắn giữa hai người dùng (theo senderId và receiverId) ======
    @GetMapping("/conversation")
    public ResponseEntity<List<MessageDto>> getMessagesBetweenUsers(
            @RequestParam Long senderId,
            @RequestParam Long receiverId) {
        List<MessageDto> messages = messageService.getMessagesBetweenUsers(senderId, receiverId);
        return ResponseEntity.ok(messages);
    }
}

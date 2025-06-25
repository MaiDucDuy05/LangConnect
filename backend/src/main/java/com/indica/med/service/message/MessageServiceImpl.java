package com.indica.med.service.message;

import com.indica.med.dto.MessageDto;
import com.indica.med.mapper.MessageMapper;
import com.indica.med.model.Message;
import com.indica.med.model.User;
import com.indica.med.repository.MessageRepository;
import com.indica.med.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final UserRepository userRepository;

    @Override
    public MessageDto sendMessage(MessageDto messageDto) {
        Message message = messageMapper.toEntity(messageDto);
        Message savedMessage = messageRepository.save(message);
        return messageMapper.toDto(savedMessage);
    }

    @Override
    public MessageDto getMessageById(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        return messageMapper.toDto(message);
    }

    @Override
    public List<MessageDto> getMessagesBySenderId(Long senderId) {
        List<Message> messages = messageRepository.findBySenderId(senderId);
        return messages.stream()
                .map(messageMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDto> getMessagesByReceiverId(Long receiverId) {
        List<Message> messages = messageRepository.findByReceiverId(receiverId);
        return messages.stream()
                .map(messageMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDto> getMessagesBetweenUsers(Long senderId, Long receiverId) {
        List<Message> messages = messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(senderId, receiverId, receiverId, senderId);
        return messages.stream()
                .map(messageMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new RuntimeException("Message not found");
        }
        messageRepository.deleteById(id);
    }

    @Override
    public MessageDto updateMessage(Long id, MessageDto dto) {
        Message message = messageRepository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
        messageMapper.updateEntity(dto,message);

        if(dto.getSenderId()!=null){
            User user = userRepository.getReferenceById(dto.getSenderId());
            message.setSender(user);
        }

        if(dto.getReceiverId()!=null){
            User user = userRepository.getReferenceById(dto.getReceiverId());
            message.setReceiver(user);
        }
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }
}
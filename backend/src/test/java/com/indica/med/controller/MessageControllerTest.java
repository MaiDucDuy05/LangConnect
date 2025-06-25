// package com.indica.med.controller;

// import com.indica.med.dto.MessageDto;
// import com.indica.med.service.message.MessageService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;

// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// class MessageControllerTest {

//     private MockMvc mockMvc;

//     @Mock
//     private MessageService messageService;

//     @InjectMocks
//     private MessageController messageController;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//         mockMvc = MockMvcBuilders.standaloneSetup(messageController).build();
//     }

//     @Test
//     void getMessageById() throws Exception {
//         Long messageId = 1L;
//         MessageDto messageDto = new MessageDto();
//         messageDto.setId(messageId);
//         messageDto.setContent("Test message");

//         when(messageService.getMessageById(messageId)).thenReturn(messageDto);

//         mockMvc.perform(get("/api/messages/{id}", messageId))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.id").value(messageId))
//                 .andExpect(jsonPath("$.content").value("Test message"));

//         verify(messageService, times(1)).getMessageById(messageId);
//     }

//     @Test
//     void sendMessage() throws Exception {
//         MessageDto messageDto = new MessageDto();
//         messageDto.setContent("New message");

//         when(messageService.sendMessage(any(MessageDto.class))).thenReturn(messageDto);

//         mockMvc.perform(post("/api/messages")
//                         .contentType("application/json")
//                         .content("{\"content\":\"New message\"}"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.content").value("New message"));

//         verify(messageService, times(1)).sendMessage(any(MessageDto.class));
//     }

//     @Test
//     void updateMessage() throws Exception {
//         Long messageId = 1L;
//         MessageDto messageDto = new MessageDto();
//         messageDto.setId(messageId);
//         messageDto.setContent("Updated message");

//         when(messageService.updateMessage(eq(messageId), any(MessageDto.class))).thenReturn(messageDto);

//         mockMvc.perform(put("/api/messages/{id}", messageId)
//                         .contentType("application/json")
//                         .content("{\"content\":\"Updated message\"}"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.content").value("Updated message"));

//         verify(messageService, times(1)).updateMessage(eq(messageId), any(MessageDto.class));
//     }

//     @Test
//     void deleteMessage() throws Exception {
//         Long messageId = 1L;

//         doNothing().when(messageService).deleteMessage(messageId);

//         mockMvc.perform(delete("/api/messages/{id}", messageId))
//                 .andExpect(status().isNoContent());

//         verify(messageService, times(1)).deleteMessage(messageId);
//     }

//     @Test
//     void getMessagesBySenderId() throws Exception {
//         Long senderId = 1L;
//         MessageDto messageDto = new MessageDto();
//         messageDto.setSenderId(senderId);
//         messageDto.setContent("Message for sender");

//         when(messageService.getMessagesBySenderId(senderId)).thenReturn(List.of(messageDto));

//         mockMvc.perform(get("/api/messages/sender/{senderId}", senderId))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].content").value("Message for sender"));

//         verify(messageService, times(1)).getMessagesBySenderId(senderId);
//     }

//     @Test
//     void getMessagesByReceiverId() throws Exception {
//         Long receiverId = 2L;
//         MessageDto messageDto = new MessageDto();
//         messageDto.setReceiverId(receiverId);
//         messageDto.setContent("Message for receiver");

//         when(messageService.getMessagesByReceiverId(receiverId)).thenReturn(List.of(messageDto));

//         mockMvc.perform(get("/api/messages/receiver/{receiverId}", receiverId))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].content").value("Message for receiver"));

//         verify(messageService, times(1)).getMessagesByReceiverId(receiverId);
//     }

//     @Test
//     void getMessagesBetweenUsers() throws Exception {
//         Long senderId = 1L;
//         Long receiverId = 2L;
//         MessageDto messageDto = new MessageDto();
//         messageDto.setSenderId(senderId);
//         messageDto.setReceiverId(receiverId);
//         messageDto.setContent("Message between users");

//         when(messageService.getMessagesBetweenUsers(senderId, receiverId)).thenReturn(List.of(messageDto));

//         mockMvc.perform(get("/api/messages/conversation")
//                         .param("senderId", senderId.toString())
//                         .param("receiverId", receiverId.toString()))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].content").value("Message between users"));

//         verify(messageService, times(1)).getMessagesBetweenUsers(senderId, receiverId);
//     }
// }

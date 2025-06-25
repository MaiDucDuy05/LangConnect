package com.indica.med.service.post;

import com.indica.med.dto.RatingDto;
import com.indica.med.dto.ReactionDto;
import com.indica.med.enums.ReactionType;
import com.indica.med.mapper.PostMapper;
import com.indica.med.mapper.ReactionMapper;
import com.indica.med.mapper.UserMapper;
import com.indica.med.model.*;
import com.indica.med.repository.PostRepository;
import com.indica.med.repository.ReactionRepository;
import com.indica.med.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReactionServiceIplm implements ReactionService{
    private final ReactionRepository reactionRepository;
    private final ReactionMapper reactionMapper;
    private final UserRepository userRepository;
    private final PostRepository postRepository;


    @Override
    public ReactionDto findReactionById(Long id) {
        Reaction reaction = reactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Reaction not found"));
        return reactionMapper.toDto(reaction);
    }

    @Override
    public ReactionDto updateReaction(Long id, ReactionDto dto) {
        Reaction reaction = reactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reaction not found"));
        reactionMapper.updateFromDto(dto,reaction);
        if(dto.getUserId()!= null) {
            User user = userRepository.getReferenceById(dto.getUserId());
            reaction.setUser(user);
        }

        if(dto.getPostId()!= null) {
            Post post = postRepository.getReferenceById(dto.getPostId());
            reaction.setPost(post);
        }
        reaction = reactionRepository.save(reaction);
        return reactionMapper.toDto(reaction);
    }

    @Override
    public ReactionDto createReaction(ReactionDto dto) {
        Reaction reaction = reactionMapper.toEntity(dto);
        reaction = reactionRepository.save(reaction);
        return reactionMapper.toDto(reaction);
    }

    @Override
    public void deleteReaction(Long id) {
        if(!reactionRepository.existsById(id)) throw new RuntimeException("Reaction not found");
        reactionRepository.deleteById(id);
    }

    @Override
    public List<ReactionDto> findReactionByPostId(Long postId) {
        List<Reaction> list = reactionRepository.findByPostId(postId);
        return list.stream().map(reactionMapper::toDto).toList();
    }

    @Override
    public List<ReactionDto> findReactionByUserId(Long userId) {
        List<Reaction> list = reactionRepository.findByUserId(userId);
        return list.stream().map(reactionMapper::toDto).toList();
    }

    @Override
    public List<ReactionDto> findReactionByPostIdAndType(Long postId, ReactionType type) {
        List<Reaction> list = reactionRepository.findByPostIdAndType(postId, type);
        return list.stream().map(reactionMapper::toDto).toList();
    }

    @Override
    public List<ReactionDto> findReactionByUserIdAndType(Long userId, ReactionType type) {
        List<Reaction> list = reactionRepository.findByUserIdAndType(userId, type);
        return list.stream().map(reactionMapper::toDto).toList();
    }
}

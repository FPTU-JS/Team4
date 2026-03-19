package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.PostEvent;
import org.example.demospring.entity.CommunityPost;
import org.example.demospring.repository.CommunityPostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostRepository communityPostRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/posts")
    public ResponseEntity<List<CommunityPost>> getAllPosts() {
        return ResponseEntity.ok(communityPostRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping("/posts")
    public ResponseEntity<CommunityPost> createPost(@RequestBody CommunityPost post) {
        if (post.getLikesCount() == null) post.setLikesCount(0);
        if (post.getCommentsCount() == null) post.setCommentsCount(0);
        if (post.getSharesCount() == null) post.setSharesCount(0);
        CommunityPost savedPost = communityPostRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("CREATED", savedPost));
        return ResponseEntity.ok(savedPost);
    }

    @PutMapping("/posts/{id}/like")
    public ResponseEntity<CommunityPost> likePost(@PathVariable Long id) {
        CommunityPost post = communityPostRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setLikesCount((post.getLikesCount() == null ? 0 : post.getLikesCount()) + 1);
        CommunityPost savedPost = communityPostRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("UPDATED", savedPost));
        return ResponseEntity.ok(savedPost);
    }
}

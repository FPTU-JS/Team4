package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.PostEvent;
import org.example.demospring.dto.response.PostResponse;
import org.example.demospring.entity.CommunityPost;
import org.example.demospring.entity.PostLike;
import org.example.demospring.repository.CommunityPostRepository;
import org.example.demospring.repository.PostLikeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostRepository communityPostRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final PostLikeRepository postLikeRepository;
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponse>> getAllPosts(@RequestParam(required = false) Long currentUserId) {
        // 1. Lấy tất cả bài post (Sắp xếp mới nhất)
        List<CommunityPost> posts = communityPostRepository.findAllByOrderByCreatedAtDesc();

        // 2. Lấy danh sách ID bài đã like của User này (nếu đã login)
        List<Long> likedPostIds = (currentUserId != null)
                ? postLikeRepository.findPostIdsByUserId(currentUserId)
                : new ArrayList<>();

        // 3. Map sang DTO
        List<PostResponse> response = posts.stream().map(post -> {
            boolean isLiked = likedPostIds.contains(post.getId());
            return new PostResponse(post, isLiked);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
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
    @Transactional
    public ResponseEntity<?> likePost(@PathVariable Long id, @RequestParam Long userId) {
        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<PostLike> existingLike = postLikeRepository.findByUserIdAndPostId(userId, id);

        if (existingLike.isPresent()) {
            postLikeRepository.delete(existingLike.get());
            post.setLikesCount(Math.max(0, post.getLikesCount() - 1));
        } else {
            // Nếu chưa like thì thêm mới
            postLikeRepository.save(new PostLike(userId, id));
            post.setLikesCount((post.getLikesCount() == null ? 0 : post.getLikesCount()) + 1);
        }

        CommunityPost savedPost = communityPostRepository.save(post);

        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("UPDATED", savedPost));

        return ResponseEntity.ok(savedPost);
    }
}
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
    public ResponseEntity<List<PostResponse>> getAllPosts(
            // CHỖ NÀY: Thêm ("currentUserId")
            @RequestParam(value = "currentUserId", required = false) Long currentUserId) {

        List<CommunityPost> posts = communityPostRepository.findAllByOrderByCreatedAtDesc();

        List<Long> likedPostIds = (currentUserId != null)
                ? postLikeRepository.findPostIdsByUserId(currentUserId)
                : new ArrayList<>();

        List<PostResponse> response = posts.stream().map(post -> {
            boolean isLiked = likedPostIds.contains(post.getId());
            return new PostResponse(post, isLiked);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/posts")
    public ResponseEntity<CommunityPost> createPost(@RequestBody CommunityPost post) {
        // Tối ưu: Dùng Optional hoặc check null gọn hơn
        post.setLikesCount(post.getLikesCount() == null ? 0 : post.getLikesCount());
        post.setCommentsCount(post.getCommentsCount() == null ? 0 : post.getCommentsCount());
        post.setSharesCount(post.getSharesCount() == null ? 0 : post.getSharesCount());

        CommunityPost savedPost = communityPostRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("CREATED", savedPost));
        return ResponseEntity.ok(savedPost);
    }

    @PutMapping("/posts/{id}/like")
    @Transactional
    public ResponseEntity<?> likePost(
            // CHỖ NÀY: Thêm ("id")
            @PathVariable("id") Long id,
            // CHỖ NÀY: Thêm ("userId")
            @RequestParam("userId") Long userId) {

        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<PostLike> existingLike = postLikeRepository.findByUserIdAndPostId(userId, id);

        if (existingLike.isPresent()) {
            postLikeRepository.delete(existingLike.get());
            post.setLikesCount(Math.max(0, (post.getLikesCount() == null ? 1 : post.getLikesCount()) - 1));
        } else {
            postLikeRepository.save(new PostLike(userId, id));
            post.setLikesCount((post.getLikesCount() == null ? 0 : post.getLikesCount()) + 1);
        }

        CommunityPost savedPost = communityPostRepository.save(post);

        // Bắn tin nhắn qua WebSocket để mọi người cùng cập nhật số Like real-time
        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("UPDATED", savedPost));

        return ResponseEntity.ok(savedPost);
    }
}
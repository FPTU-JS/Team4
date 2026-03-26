package org.example.demospring.controller;

import lombok.RequiredArgsConstructor;
import org.example.demospring.dto.PostEvent;
import org.example.demospring.dto.response.PostResponse;
import org.example.demospring.entity.AppNotification;
import org.example.demospring.entity.CommunityPost;
import org.example.demospring.entity.PostComment;
import org.example.demospring.entity.PostLike;
import org.example.demospring.entity.User;
import org.example.demospring.repository.CommunityPostRepository;
import org.example.demospring.repository.NotificationRepository;
import org.example.demospring.repository.PostCommentRepository;
import org.example.demospring.repository.PostLikeRepository;
import org.example.demospring.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.concurrent.ConcurrentHashMap;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostRepository communityPostRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final PostLikeRepository postLikeRepository;
    private final PostCommentRepository postCommentRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    // Rate limiting map: AuthorId -> Last Post Time
    private final Map<Long, LocalDateTime> userLastPostTime = new ConcurrentHashMap<>();
    private static final int POST_COOLDOWN_SECONDS = 60;

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
    public ResponseEntity<?> createPost(@RequestBody CommunityPost post) {
        org.example.demospring.entity.User currentUser = org.example.demospring.security.SecurityUtils.getCurrentUser();
        if (currentUser == null) return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();

        post.setAuthorId(currentUser.getId());
        post.setAuthorName(currentUser.getFullName());
        post.setAvatarUrl(currentUser.getAvatarUrl());

        if (post.getAuthorId() != null) {
            LocalDateTime lastPost = userLastPostTime.get(post.getAuthorId());
            if (lastPost != null && LocalDateTime.now().isBefore(lastPost.plusSeconds(POST_COOLDOWN_SECONDS))) {
                return ResponseEntity.status(429).body(java.util.Map.of("message", "Bạn đang thao tác quá nhanh! Vui lòng chờ 1 phút trước khi đăng bài tiếp theo."));
            }

            java.time.LocalDateTime startOfDay = java.time.LocalDate.now().atStartOfDay();
            java.time.LocalDateTime endOfDay = startOfDay.plusDays(1);
            long count = communityPostRepository.countByAuthorIdAndCreatedAtBetween(post.getAuthorId(), startOfDay, endOfDay);
            if (count >= 5) {
                return ResponseEntity.status(org.springframework.http.HttpStatus.BAD_REQUEST)
                        .body(java.util.Map.of("message", "Bạn đã đạt giới hạn tạo 5 bài viết mỗi ngày. Vui lòng quay lại vào ngày mai!"));
            }
        }
        // Tối ưu: Dùng Optional hoặc check null gọn hơn
        post.setLikesCount(post.getLikesCount() == null ? 0 : post.getLikesCount());
        post.setCommentsCount(post.getCommentsCount() == null ? 0 : post.getCommentsCount());
        post.setSharesCount(post.getSharesCount() == null ? 0 : post.getSharesCount());

        CommunityPost savedPost = communityPostRepository.save(post);
        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("CREATED", savedPost));
        
        if (post.getAuthorId() != null) {
            userLastPostTime.put(post.getAuthorId(), LocalDateTime.now());
        }
        
        return ResponseEntity.ok(savedPost);
    }

    @PutMapping("/posts/{id}/like")
    @Transactional
    public ResponseEntity<?> likePost(@PathVariable("id") Long id) {

        Long userId = org.example.demospring.security.SecurityUtils.getCurrentUserId();
        if (userId == null) return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();

        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Optional<PostLike> existingLike = postLikeRepository.findByUserIdAndPostId(userId, id);

        if (existingLike.isPresent()) {
            postLikeRepository.delete(existingLike.get());
            post.setLikesCount(Math.max(0, (post.getLikesCount() == null ? 1 : post.getLikesCount()) - 1));
        } else {
            postLikeRepository.save(new PostLike(userId, id));
            post.setLikesCount((post.getLikesCount() == null ? 0 : post.getLikesCount()) + 1);

            if (post.getAuthorId() != null && !post.getAuthorId().equals(userId)) {
                User liker = userRepository.findById(userId).orElse(null);
                String likerName = liker != null ? liker.getFullName() : "Ai đó";
                AppNotification notif = AppNotification.builder()
                        .userId(post.getAuthorId())
                        .title("Lượt thích mới")
                        .message(likerName + " đã thích bài viết của bạn.")
                        .link("/community?post=" + id)
                        .type("LIKE")
                        .isRead(false)
                        .build();
                notificationRepository.save(notif);
                messagingTemplate.convertAndSend("/topic/notifications/" + post.getAuthorId(), notif);
            }
        }

        CommunityPost savedPost = communityPostRepository.save(post);

        // Bắn tin nhắn qua WebSocket để mọi người cùng cập nhật số Like real-time
        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("UPDATED", savedPost));

        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/posts/{id}/comments")
    public ResponseEntity<List<PostComment>> getPostComments(@PathVariable("id") Long id) {
        return ResponseEntity.ok(postCommentRepository.findByPostIdOrderByCreatedAtDesc(id));
    }

    @PostMapping("/posts/{id}/comments")
    public ResponseEntity<?> addComment(
            @PathVariable("id") Long id,
            @RequestBody PostComment comment) {

        org.example.demospring.entity.User currentUser = org.example.demospring.security.SecurityUtils.getCurrentUser();
        if (currentUser == null) return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();

        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        comment.setUserId(currentUser.getId());
        comment.setAuthorName(currentUser.getFullName());
        comment.setAvatarUrl(currentUser.getAvatarUrl());
        comment.setPostId(id);
        PostComment savedComment = postCommentRepository.save(comment);

        post.setCommentsCount((post.getCommentsCount() == null ? 0 : post.getCommentsCount()) + 1);
        communityPostRepository.save(post);

        if (post.getAuthorId() != null && !post.getAuthorId().equals(comment.getUserId())) {
            AppNotification notif = AppNotification.builder()
                    .userId(post.getAuthorId())
                    .title("Bình luận mới")
                    .message(comment.getAuthorName() + " đã bình luận bài viết của bạn.")
                    .link("/community?post=" + id)
                    .type("COMMENT")
                    .isRead(false)
                    .build();
            notificationRepository.save(notif);
            messagingTemplate.convertAndSend("/topic/notifications/" + post.getAuthorId(), notif);
        }

        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("UPDATED", post));

        return ResponseEntity.ok(savedComment);
    }

    @PutMapping("/posts/{id}/share")
    public ResponseEntity<?> sharePost(@PathVariable("id") Long id) {
        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setSharesCount((post.getSharesCount() == null ? 0 : post.getSharesCount()) + 1);
        CommunityPost savedPost = communityPostRepository.save(post);

        messagingTemplate.convertAndSend("/topic/posts", new PostEvent("UPDATED", savedPost));

        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Map<String, Object>>> getTrendingTopics() {
        List<CommunityPost> allPosts = communityPostRepository.findAll();
        Map<String, Integer> tagCounts = new HashMap<>();
        for (CommunityPost post : allPosts) {
            if (post.getTags() != null && !post.getTags().trim().isEmpty()) {
                String[] tags = post.getTags().split(",");
                for (String t : tags) {
                    String tag = t.trim();
                    if (!tag.isEmpty()) {
                        tagCounts.put(tag, tagCounts.getOrDefault(tag, 0) + 1);
                    }
                }
            }
        }
        
        List<Map<String, Object>> trending = tagCounts.entrySet().stream()
            .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
            .limit(5)
            .map(e -> {
                Map<String, Object> map = new HashMap<>();
                map.put("tag", e.getKey());
                map.put("count", e.getValue());
                return map;
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(trending);
    }
}
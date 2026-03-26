package org.example.demospring.repository;

import org.example.demospring.entity.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findAllByOrderByCreatedAtDesc();

    long countByAuthorIdAndCreatedAtBetween(Long authorId, java.time.LocalDateTime start, java.time.LocalDateTime end);
}

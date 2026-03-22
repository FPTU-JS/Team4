package org.example.demospring.repository;

import org.example.demospring.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    @Query("SELECT pl.postId FROM PostLike pl WHERE pl.userId = :userId")
    List<Long> findPostIdsByUserId(@Param("userId") Long userId);

    Optional<PostLike> findByUserIdAndPostId(Long userId, Long postId);
}

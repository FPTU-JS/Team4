package org.example.demospring.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.demospring.entity.CommunityPost;

@Data
@AllArgsConstructor
public class PostResponse {
    private CommunityPost post;
    private boolean isLiked;
}
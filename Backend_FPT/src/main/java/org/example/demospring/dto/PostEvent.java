package org.example.demospring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.demospring.entity.CommunityPost;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEvent {
    private String type; // expected "CREATED" or "UPDATED"
    private CommunityPost post;
}

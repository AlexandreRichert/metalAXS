import type { PostListItem, PostTag } from "@/sanity/lib/types";

export function getPostTags(post: Pick<PostListItem, "tags">): PostTag[] {
  return (post.tags ?? []).filter(
    (tag): tag is PostTag => Boolean(tag?._id && tag?.title)
  );
}

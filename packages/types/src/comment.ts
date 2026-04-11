export interface CommentItem {
  commentId: number;
  content: string;
  anonymousLabel: string;
  isPostAuthor: boolean;
  deleted: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface CommentListResponse {
  items: CommentItem[];
}

export interface CommentCreateRequest {
  content: string;
  parentId?: number;
}

export interface CommentUpdateRequest {
  content: string;
}

export interface CommentCreateResponse {
  commentId: number;
}

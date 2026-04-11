export type BoardType = "FREE" | "QNA" | "PROJECT_RECRUIT" | "STUDY_RECRUIT";

export type RecruitStatus = "OPEN" | "CLOSED";

export interface RecruitmentDetail {
  capacity: number;
  currentCount: number;
  contactMethod: string;
  recruitStatus: RecruitStatus;
  deadline: string;
}

export interface PostDetail {
  postId: number;
  boardType: BoardType;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  imageUrls: string[];
  recruitment: RecruitmentDetail | null;
  authorName: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PostCreateRequest {
  boardType: BoardType;
  title: string;
  content: string;
  recruitment?: RecruitmentCreateRequest;
}

export interface RecruitmentCreateRequest {
  capacity: number;
  contactMethod: string;
  deadline: string;
}

export interface PostUpdateRequest {
  title: string;
  content: string;
}

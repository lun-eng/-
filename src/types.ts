export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  duration: string;
  status: "completed" | "locked" | "active";
  videoUrl?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

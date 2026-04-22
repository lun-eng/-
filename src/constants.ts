export const COURSE_SYLLABUS = [
  {
    id: "ch1",
    title: "第一章: 基础入门",
    lessons: [
      { id: "1.1", title: "系统架构概览", duration: "24:00", status: "active" },
      { id: "1.2", title: "环境搭建指南", duration: "18:00", status: "completed" },
      { id: "1.3", title: "核心术语解析", duration: "15:00", status: "locked" },
    ]
  },
  {
    id: "ch2",
    title: "第二章: 进阶实战",
    lessons: [
      { id: "2.1", title: "并发模型深入", duration: "32:00", status: "locked" },
      { id: "2.2", title: "分布式系统设计", duration: "45:00", status: "locked" },
    ]
  }
];

export const NAV_LINKS = [
  { name: "课程", href: "/courses" },
  { name: "学习路径", href: "/path" },
  { name: "认证", href: "/certifications" },
  { name: "资源", href: "/resources" },
];

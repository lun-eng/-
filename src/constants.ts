import { Chapter } from "./types";

export const COURSE_SYLLABUS: Chapter[] = [
  {
    id: "ch1",
    title: "第一章: 基础入门",
    lessons: [
      { 
        id: "1.1", 
        title: "系统架构概览", 
        subtitle: "企业级可扩展性设计",
        description: "本章节将深入探讨现代企业级系统的核心架构原则。我们将从分层架构入手，分析如何通过模块化设计提升系统的可扩展性与维护性。重点包括微服务演进、数据一致性策略以及在高并发环境下的性能优化手段。",
        duration: "24:00", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E7%A1%AC%E4%BB%B6%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1836850645&Signature=PewxXaXxVGasUhuveDUabYKs%2BW8%3D" 
      },
      { 
        id: "1.2", 
        title: "环境搭建指南", 
        duration: "18:00", 
        status: "completed",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E7%A1%AC%E4%BB%B6%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1836850645&Signature=PewxXaXxVGasUhuveDUabYKs%2BW8%3D"
      },
      { 
        id: "1.3", 
        title: "核心术语解析", 
        duration: "15:00", 
        status: "locked" 
      },
    ]
  },
  {
    id: "ch2",
    title: "第二章: 进阶实战",
    lessons: [
      { 
        id: "2.1", 
        title: "并发模型深入", 
        duration: "32:00", 
        status: "locked" 
      },
      { 
        id: "2.2", 
        title: "分布式系统设计", 
        duration: "45:00", 
        status: "locked" 
      },
    ]
  }
];

export const NAV_LINKS = [
  { name: "课程", href: "/courses" },
  { name: "学习路径", href: "/path" },
  { name: "认证", href: "/certifications" },
  { name: "资源", href: "/resources" },
];

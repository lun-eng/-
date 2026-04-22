import { Chapter } from "./types";

export const COURSE_SYLLABUS: Chapter[] = [
  {
    id: "ch1",
    title: "第一章：UnitX基础知识介绍",
    lessons: [
      { 
        id: "1.1", 
        title: "UnitX硬件产品介绍", 
        subtitle: "核心硬件链路与设计",
        description: "本章节将为您详细介绍 UnitX 的硬件产品家族，涵盖计算平台、传感器集成以及工业级硬件链路的设计理念。",
        duration: "08:24", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E7%A1%AC%E4%BB%B6%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1836850645&Signature=PewxXaXxVGasUhuveDUabYKs%2BW8%3D" 
      },
      { 
        id: "1.2", 
        title: "UnitX软件产品介绍", 
        subtitle: "软件架构与开发栈",
        description: "深入了解 UnitX 软件生态系统，包括核心 SDK、部署套件以及开发者工具的使用指南。",
        duration: "12:15", 
        status: "completed",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E8%BD%AF%E4%BB%B6%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1782851333&Signature=X30o63YY0NPpcXsxRUyHAUoV3fs%3D"
      },
    ]
  },
  {
    id: "ch2",
    title: "第二章：UnitX相机光源镜头介绍",
    lessons: [
      { 
        id: "2.1", 
        title: "UnitX常用相机介绍", 
        subtitle: "视觉传感器选型指南",
        description: "本节介绍 UnitX 系统中常用的各种工业相机及其校准与配置流程。",
        duration: "15:45", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E5%B8%B8%E7%94%A8%E7%9B%B8%E6%9C%BA%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1782851386&Signature=GrMY1CzH4ofc9LA%2BirTYPnt0Hy8%3D"
      },
      { 
        id: "2.2", 
        title: "UnitX常用镜头介绍", 
        subtitle: "光学系统核心组件",
        description: "从焦距到畸变校正，讲解如何在不同工业场景下选择最合适的镜头。",
        duration: "10:30", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E5%B8%B8%E7%94%A8%E9%95%9C%E5%A4%B4%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1782851421&Signature=9%2Bdw0aU2ENwws4Bf7VuCPNgx7Vw%3D"
      },
      { 
        id: "2.3", 
        title: "UnitX常用光源介绍", 
        subtitle: "成像环境光效设计",
        description: "探讨各种光源类型及其如何影响视觉识别精度。",
        duration: "09:50", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E5%B8%B8%E7%94%A8%E5%85%89%E6%BA%90%E4%BB%8B%E7%BB%8D.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1782851442&Signature=9UkfhViICBF2%2BchKn7IQqJwFYGI%3D"
      },
    ]
  },
  {
    id: "ch3",
    title: "第三章：名词解释",
    lessons: [
      { 
        id: "3.1", 
        title: "UnitX专业名词解析", 
        subtitle: "领域专业术语对照表",
        description: "统一行业话语体系，解析 UnitX 系统中的专有技术词汇。",
        duration: "14:20", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/UnitX%E4%B8%93%E4%B8%9A%E5%90%8D%E8%AF%8D%E8%A7%A3%E6%9E%90.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1782851483&Signature=AlVXUHhQpE3HN8I29wTh7UPJiZE%3D"
      },
      { 
        id: "3.2", 
        title: "常用广泛名词解释", 
        subtitle: "通用工业视觉基础",
        description: "涵盖工业自动化与视觉识别领域的高频通用术语理解。",
        duration: "18:50", 
        status: "active",
        videoUrl: "https://unitx-data.oss-cn-shenzhen.aliyuncs.com/%E8%A7%86%E9%A2%91/UnitX%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D/%E5%B8%B8%E7%94%A8%E5%B9%BF%E6%B3%9B%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A.mp4?OSSAccessKeyId=LTAI5t7jrAXpg1woEAz1KV8o&Expires=1782851540&Signature=jKCxV5JxYiqQ6i1%2Fx93ax2s8r%2F4%3D"
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

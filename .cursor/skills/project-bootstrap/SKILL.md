---
name: project-bootstrap
description: 从零启动项目的规则，创建项目骨架和文档体系。当用户要求创建新项目、初始化项目、或从零开始搭建项目时使用。
---

# 项目启动规则

本规则适用于从零创建新项目。遵循 `spec_driven.mdc` 的规范驱动流程，先建立契约层级是项目级 `spec.md` 而后功能级 `CONTRACT.md`。

流程分五步：澄清关键信息、写项目级契约 `spec.md`、用户确认后初始化项目、创建文档骨架、各功能按 `spec_driven.mdc` 处理。

项目启动需要额外澄清技术交付侧信息：项目形态、技术栈、部署方式。澄清格式按 `spec_driven.mdc` 的三到七个问题带选项。

<spec_format>
项目级契约 `spec.md` 包含：

项目目标：一句话说明项目做什么

功能清单：MoSCoW 优先级标记
- MUST 核心功能，每个包含 ID（FEAT-001）、描述、核心 Scenario
- SHOULD 重要功能
- COULD 可选功能
- WON'T 明确不做

技术约束：技术栈、部署方式、性能要求

非目标：明确排除的范围
</spec_format>

<initialization>
用户确认 `spec.md` 后执行项目初始化：

1. Git 初始化：`git init`、创建 `.gitignore`、首次提交
2. 依赖管理：根据技术栈创建依赖文件（package.json、requirements.txt 等）并安装
3. 工具链：初始化 lint、format、typecheck 配置
4. 测试框架：初始化测试目录和配置，写一个烟雾测试验证项目可运行
5. 门禁验证：运行 lint、format、test、build 确保基础设施就绪
</initialization>

<skeleton>
初始化后创建文档骨架：

根目录文档：`spec.md`（已创建）、`design.md`、`plan.md`、`AGENT.md`

契约目录：`.ai-contracts/`

`plan.md` 初始任务：按优先级开发功能

各功能开发按 `spec_driven.mdc` 流程在 `.ai-contracts/<feature>/` 下建立契约。
</skeleton>

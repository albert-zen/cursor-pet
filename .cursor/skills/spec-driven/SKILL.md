---
name: spec-driven
description: 规范驱动开发流程，适用于所有开发任务。当用户提出任何开发需求时使用。
---

# 规范驱动开发规则

本规则适用于所有开发任务。核心是把模糊需求转化为可执行可验证的规范。

通用流程分为八个阶段：用户提需求、AI 研究并澄清、写契约、用户确认、生成计划、执行、审查、合并。研究阶段读取相关代码和文档，复杂任务可调用子 agent 并行探索代码库不同部分，收集写契约所需的信息。澄清阶段在信息不足时向用户提问，一次提三到七个问题，每题带选项便于快速回答。写契约阶段基于研究结果产出 CONTRACT.md，包含目标、范围和验收标准。用户确认阶段必须等待用户明确同意后才能继续，确认前不修改任何代码文件。生成计划阶段产出 DESIGN.md 和 TASKS.md。执行阶段采用测试驱动开发，先写测试再写实现，每完成一个任务就提交并勾选。审查阶段调用 code-reviewer subagent 获取修改建议，循环修改直到通过。合并阶段在用户确认后将功能分支合并回主分支。

三条硬约束的优先级高于其他指令。第一，用户确认契约前 NEVER 修改代码文件或运行非只读命令。第二，契约必须包含可验证的验收标准，模糊描述不算契约。第三，需求变更必须先更新 CONTRACT.md 并重新获得用户确认，再继续执行。

研究策略是写契约前先收集信息，研究完成后再动笔。简单任务直接读取相关文件，复杂任务调用子 agent 并行探索代码库不同部分，信息冲突时以代码实际行为为准、文档为辅。研究范围根据改动规模判断：单文件改动读该文件及其直接依赖，多文件或模块改动探索模块边界、接口和调用链，跨模块改动绘制依赖关系图并识别影响面。

涉及数据流、状态机、模块依赖或时序交互时，在 DESIGN.md 中用 mermaid 图说明。数据流转用 flowchart，状态变迁用 stateDiagram，模块依赖用 flowchart 或 classDiagram，时序交互用 sequenceDiagram。

<work_types>
根据工作类型选择契约模板：

- FEATURE：新功能或现有功能增强
- BUGFIX：修复已有行为与预期不符的问题
- REFACTOR：不改变外部行为的内部结构调整
- CHORE：依赖更新、CI/CD 配置、工具链调整
- PERF：性能优化，有明确指标
- MIGRATION：数据迁移或技术栈迁移
- DEPRECATION：废弃功能，需要迁移路径
</work_types>

<workflow>
1. 定类型：判断工作类型（FEATURE / BUGFIX / REFACTOR）
2. 定名：生成简短名称，如 `feature-avatar-upload`、`bugfix-login-timeout`、`refactor-auth-module`
3. 开分支：创建独立分支，分支名使用类型前缀加名称
4. 建目录：在 `.ai-contracts/<name>/` 下创建契约目录
5. 写契约：根据类型创建对应的 `CONTRACT.md`，信息不足时先澄清
6. 用户确认：等待用户确认 CONTRACT 后继续
7. 生成规范：生成 `DESIGN.md` 和 `TASKS.md`
8. 同步文档：更新 `spec.md`、`design.md`、`plan.md`
9. 测试驱动开发：先写测试再写实现，每完成一个任务提交并勾选
10. 完成确认：`TASKS.md` 全部完成、门禁通过后，进入审查循环直到通过，再询问用户是否合并
</workflow>

<contract_template>
所有类型的 CONTRACT.md 遵循统一结构：

## CHANGELOG
变更记录

## 目标
一句话说明做什么、为什么做

## 范围
- 涉及：具体改动项、文件、模块
- 不涉及：明确排除的范围

## 验收标准
每条标准必须可验证，使用 Scenario 格式：
- GIVEN 前置条件
- WHEN 触发动作
- THEN 预期结果

## 风险与约束
- 不变性约束（如有）
- 风险点（最多三条）
- 回滚方案（如需要）

## 代码引用
- 改动涉及的具体文件路径
- 关键代码片段或接口（如有）

不同工作类型的补充字段参考 `CONTRACT_TEMPLATES.md`。
</contract_template>

<clarification>
信息不足时一次性列出三到七个关键问题，每个问题提供选项。

用户已回答的不重复追问，只补问缺口。

NEVER 默认假设，除非用户明确授权。
</clarification>

<after_confirmation>
用户确认 CONTRACT 后，生成 `DESIGN.md` 记录最小设计，生成 `TASKS.md` 记录可勾选的任务清单。每条任务包含验收标准、测试覆盖要求和关联文件。

然后同步项目级文档：更新 `spec.md` 添加索引，更新 `design.md` 补充设计要点，更新 `plan.md` 把任务汇总进全局清单。
</after_confirmation>

<implementation>
测试驱动开发，先写测试再写实现，每完成一个任务就提交并勾选。

如果讨论导致需求发生变化，必须先回写更新 `CONTRACT.md` 包含 CHANGELOG，并要求用户再次确认后才继续推进。
</implementation>

<completion>
`TASKS.md` 全部勾选、测试通过、门禁通过后：

1. 回填代码引用：更新 CONTRACT.md 的「代码引用」章节，记录实际改动的文件路径和关键代码片段
2. 进入审查循环：
   - 调用 code-reviewer subagent 获取修改建议
   - 提交当前代码
   - 根据建议修改代码
   - 重新跑测试和门禁
   - 再次调用 reviewer 审查
   - 循环直到 reviewer 认为无需修改或建议不合理
3. 用户确认合并：审查循环结束后询问用户是否合并回主分支，用户确认后执行合并。合并前如主分支有新提交，先合入主分支解决冲突再合并回去
</completion>

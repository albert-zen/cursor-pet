---
name: code-review
description: 代码审查规则，定义审查焦点和输出格式。当用户要求审查代码、review PR、检查代码质量、或询问代码是否可合入时使用。
---

# 代码审查规则

本规则定义代码审查的焦点和输出格式。审查以可维护性与可验证性为准则。

<output_format>
按以下顺序输出结构化审查结果：

1. 结论：是否可合入及最大阻塞点一条
2. 必须改：按文件或函数定位并提供具体改法
3. 建议改：仅列高收益项
4. 测试清单：必须新增或补齐的测试用例
</output_format>

<focus>
可读性：命名、结构、重复、隐式状态

正确性：边界条件、异常路径、资源释放、并发

安全性：输入校验、注入、路径遍历、越权

可测试性：逻辑是否可隔离、副作用是否集中
</focus>

<code_style_check>
代码风格检查（对齐 `development.mdc` 的 `<code_style>`）：

- 可读性第一：逻辑是否平铺直叙，是否存在过度抽象
- 抽象层最小化：重复不足三次的逻辑是否被过早提取
- 命名准确：变量名、函数名、文件名是否能说明用途，是否存在不必要的缩写
- 函数要短：单个函数是否只做一件事，超过 50 行的函数是否应该拆分
- 不过度优化：是否存在没有性能问题却提前优化的情况
</code_style_check>

<contract_check>
当 `.ai-contracts/<feature>/` 目录存在时（契约格式见 `spec_driven.mdc`），必须检查：

- 每个 Scenario 是否有测试覆盖
- 实现是否与 MUST、SHOULD、COULD 级别一致
- WON'T 项是否未被实现
- 行为变更是否已更新 CHANGELOG
- `TASKS.md` 是否全部勾选完成
</contract_check>

<missing_contract>
当改动是新增功能或行为变更但尚未建立契约时：

1. 审查过程中直接补齐最小契约目录和 `CONTRACT.md`
2. 要求补齐测试并同步到 `plan.md`
3. 完成上述步骤后再允许合入
</missing_contract>

---
title: "Compound Engineering——让每一行代码都产生复利"
date: "2026-05-02"
description: "传统开发是债务累积，每加一个功能就增加复杂度。Compound Engineering 反转这个趋势：每次改动都让下一次更容易。这是 Every 团队用 50+ Agent 和 38+ Skill 跑出来的工程方法论，也是我个人最看好的 AI 协作方向。"
tags: ["AI协作", "Compound Engineering", "Agent工作流", "软件开发", "方法论"]
---

# Compound Engineering——让每一行代码都产生复利

## 一个令人不安的早晨

Kieran Klaassen（Every 的 Cora 产品负责人）在某天打开 GitHub 时，看到了一段让他愣住的评论：

> "Changed variable naming to match pattern from PR #234, removed excessive test coverage per feedback on PR #219, added error handling similar to approved approach in PR #241."

这不是人类同事写的。这是 Claude Code 自动留下的 review 评论——它从过去三个月的 code review 中学到了 Kieran 的品味，并在他没有要求的情况下主动应用了这些规则。

**它感觉像是在作弊，但其实不是。这是复利。**

Every time we fix something, the system learns. Every time we review something, the system learns. Every time we fail in an avoidable way, the system learns.

这就是 **Compound Engineering（复利工程）**：构建一种自我改进的开发系统，每次迭代都让下一次更快、更安全、更好。

---

## 传统工程的隐性成本

传统软件开发有一个默认假设：每加一个功能，下一次改动就更难。更多代码意味着更多边界情况、更多依赖关系、更多需要重新发现的知识。这是技术债务的本质。

AI 编程工具（Copilot、Codex、Claude Code）的出现改变了执行速度，但没有改变这个基本结构。如果你只是用更快的打字机写更多代码，债务累积的速度也会跟着加速。

**短期增益的陷阱：**

- 你 prompt，它写代码，你 ship
- 然后你从零开始下一个任务
- 上一次的踩坑经验没有被记录
- 上一次的 code review 洞察没有被继承
- 上一次的架构决策没有形成约束

这不是复利，这是**一次性劳务**。你今天快了，明天没有更快。

---

## 什么是 Compound Engineering

Compound Engineering 不是某个单一工具，而是一种工程哲学：**让系统具备记忆，让每次协作都产生持久价值。**

Every 团队（出品 Chain of Thought 新闻通讯和 Cora、Spiral、Sparkle 等 AI 产品的公司）把这套方法跑到了极致。他们内部运行 5 个产品，每个主要由**一个人**维护，服务数千日活用户——不是 demo，是真实生产环境。

他们的数据：在 Cora 项目上运行 Compound Engineering 三个月后，feature 的 time-to-ship 从平均一周以上降到了 **1-3 天**，生产前拦截的 bug 大幅增加，PR review 周期从几天压缩到**几小时**。

核心判断：**1 个善用 Compound Engineering 的开发者，产出接近 5 个传统开发者。**

---

## 复利工程的五层实践

Compound Engineering 的核心不是"堆更多 Agent"，而是设计一个**会学习的系统**。我把它的实践拆解成五层，从个人到团队协作逐层展开。

### 第一层：通过工作来教学（Teach Through Work）

大多数工程师在 code review 时会说"这里命名不对""这个逻辑太复杂"，说完就过了。Compound Engineer 会做一件事：**把这条规则写进系统。**

Every 团队用 `CLAUDE.md` 和 `llms.txt` 作为"活文档"：

- **CLAUDE.md** —— 记录你的品味和偏好。为什么你偏好 guard clauses 而不是嵌套 if？为什么某些命名模式更好？Agent 在每次对话前自动读取它。
- **llms.txt** —— 记录高层架构决策和设计原则。不因某次重构而变化的系统级规则。

这些文件不是写一次就完。每次你纠正 Agent 的行为，都要问自己：这条规则值得写进去吗？如果值得，就更新文档。**你教系统的每一课，都是永久资产。**

### 第二层：计划占 80%，执行占 20%

Compound Engineering 的时间分配是反直觉的：

> **80% 在规划和审查，20% 在执行。**

为什么？因为当 Agent 写代码的速度不再是瓶颈时，**方向对不对**变成了最大杠杆点。

Every 开源的 Compound Engineering 插件里有一条核心工作流：

```
/ce-ideate → /ce-brainstorm → /ce-plan → /ce-work → /ce-code-review → /ce-compound
```

- **ce-brainstorm** —— 在写代码之前，用交互式 Q&A 把需求想透，输出一份 right-sized 的需求文档
- **ce-plan** —— 把需求变成结构化实现计划，包含文件路径、依赖关系、风险、测试场景
- **ce-work** —— 执行计划
- **ce-code-review** —— 多 Agent 并行审查

plan 阶段的质量决定了 work 阶段的返工量。一个好的 plan 让实现者"不需要问就能自信地开始"。

### 第三层：多 Agent 并行审查（置信度门控 + 去重）

Compound Engineering 最硬核的设计之一是 **ce-code-review**。

不是让一个 Agent  review 你的代码，而是同时 spawn 多个专门化的 reviewer：

- **ce-correctness-reviewer** —— 逻辑错误、边界情况、状态 bug
- **ce-security-reviewer** —— 可利用漏洞，带置信度校准
- **ce-performance-reviewer** —— 运行时性能
- **ce-maintainability-reviewer** —— 耦合度、复杂度、命名、死代码
- **ce-adversarial-reviewer** —— 主动构造失败场景，跨组件边界破坏实现

每个 reviewer 返回结构化 JSON 结果，包含**置信度评级**（confidence calibration）。系统会把低置信度发现标记为"需要人类介入"，高置信度发现自动合并和去重，最终输出一份干净的可执行报告。

这不是炫技。它的价值在于：**用计算成本换人类注意力。** 一杯咖啡的价格就能 spawn 五个专门 reviewer，而人类只需要处理真正需要判断的部分。

### 第四层：把失败变成升级（Turn Failures Into Upgrades）

传统工程师修完 bug 就继续前进。Compound Engineer 会问三个问题：

1. **测试** —— 有没有测试能防止这个类别的问题再次发生？
2. **规则** —— 系统规则（CLAUDE.md / monitor / lint）需不需要更新？
3. **评估** —— 有没有持续验证机制（evaluation）来确保这个管道不会在未来退化？

Kieran 举了一个 Cora 的真实例子：用户报告没收到每日邮件 Brief——这是一个关键故障。他们修复后做了三件事：写了捕获同类投递失败的测试、更新了监控规则在未发送时告警、构建了持续验证投递管道的 evaluation。**现在系统永久地守护着这个问题类别。**

一次失败 → 永久免疫。这才是复利。

### 第五层：信任系统，验证输出

这是最难的一层。你的本能会是逐行审查 Agent 的产出。但 Compound Engineering 要求你换一种身份：**你不是打字员，你是导演。**

导演不会自己演每一幕，但他会设计系统来确保质量：

- 用**测试**约束局部逻辑
- 用**浏览器验证**确认交互和关键流程
- 用**evaluation**持续监控质量
- 用**spot checks**抽查而不是全量审查

当某次产出出错时，不要只是修正结果——**教系统为什么错了**。更新规则、补充测试、记录约束。下一次，同样的错误不会出现。

---

## 一个具体案例： frustration detector 的 TDD 循环

Kieran 在 Cora 里做了一个"挫折检测器"——让 AI 助手识别用户何时对应用行为感到沮丧，并自动提交改进报告。

传统方式：写检测逻辑 → 手动测试 → 反复 tweak。上下文切换成本高，需要同时像用户和开发者一样思考。

Compound Engineering 方式：

1. **给 Agent 一个样本对话**（用户反复问同一个问题，语言越来越简洁——这是挫折信号）
2. **让 Agent 写测试** —— "这段对话显示了挫折感，写一个测试来检查我们的工具是否能捕捉到它"
3. **测试自然失败**（TDD 的第一步）
4. **让 Agent 写检测逻辑**
5. **让 Agent 迭代 prompt 直到测试通过** —— 它读取失败日志，调整 prompt，再跑测试
6. **跑 10 次测试验证稳定性** —— AI 输出不是确定性的，一次通过不够。发现 10 次中只有 4 次通过
7. **分析失败的 chain of thought** —— Agent 发现它漏掉了"礼貌但沮丧"的语言，比如 "Hmm, not quite"。更新 prompt 专门查找这类表达
8. **再次验证：9/10 通过，够好，可以 ship**
9. **把整个工作流固化到 CLAUDE.md** —— 下次需要检测用户情绪或行为时，直接说"用 frustration detector 的 prompt 工作流"，系统已经知道怎么做

这个案例里，**实现不是一个函数，而是一个可被不断精炼的 prompt**。每次失败都教系统一些东西。每次成功都变成一个模式。

---

## 与知识管理的深层呼应

Compound Engineering 和我在 all_in_one 里做的知识蒸馏系统，底层逻辑是同一个：**信息不是存进去的，是蒸馏出来的。**

| 知识蒸馏塔 | Compound Engineering |
|-----------|---------------------|
| 来源 → 对象分类 → 晋升 → 淘汰 | ideate → brainstorm → plan → work → review → compound |
| `docs/solutions/` 是可搜索的知识库 | `docs/solutions/` 是可搜索的问题解决方案库 |
| 晋升规则判断什么值得留 | confidence gating 判断什么值得人类关注 |
| AI 做整理，人做判断 | Agent 做执行和审查，人做方向决策 |

Every 的 `ce-compound` skill 会把你刚解决的问题文档化成一个带 YAML frontmatter 的文件，存进 `docs/solutions/`。下次遇到同类问题，Agent 可以直接搜索到先前的解决方案。**这就是代码层面的知识复利。**

---

## 为什么不迷信"更重的工作流"

Compound Engineering 插件本身支持从 Claude Code 到 Codex、Cursor、Copilot、Droid、Qwen、OpenCode、Pi、Gemini、Kiro 等 10+ 平台。但它不是银弹。

它的创始人 Dan Shipper 说得很直接：

> "This shift has huge implications for how software is built at every company, and how ambitious and productive every developer can be... They just need a good system to harness its power."

关键不是工具多高级，而是你能不能建立一个**让偏差更容易被发现、被拦截、被修正、被记住**的系统。

我在自己的实践里也有类似体会：先对齐再动手、控制上下文、建立验证闭环——这些轻量原则本身就是 harness。不一定非要上到一个特别重、特别全自动的形态才叫 Compound Engineering。**可控比炫酷更重要，连续性比完整口号更重要。**

---

## 如果你今天想开始

不需要一次性上完整套系统。从一件小事开始：

1. **写一个 CLAUDE.md** —— 记录你当前项目的 10 条具体规则（不是从网上抄的 generic 建议）
2. **下次修 bug 时多问一句** —— 我能不能防止这个类别的问题再次发生？写一个测试，更新一条规则
3. **尝试三车道工作流** —— 开三个终端：一个做 plan，一个做 work，一个做 review
4. **跑一次 /ce-compound** —— 把你最近解决的一个问题文档化，存进 docs/solutions/

然后明天再做一次。看看什么在复利。

---

## 参考

- [Compound Engineering: How Every Codes With Agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) — Dan Shipper & Kieran Klaassen
- [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) — Kieran Klaassen
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — 50+ agents, 38+ skills, MIT license

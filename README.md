# demo-to-do-agent-assignment

This repository is a brief demonstration of the **Spec Driven Development (SDD)** process using [Spec-Kit](https://speckit.org/) and [GitHub Copilot Agents](https://github.com/copilot) in the cloud.

**👉 Review the [Issues](../../issues) and [Pull Requests](../../pulls) to see how the process works.**

## Why This Matters Now

AI capabilities have evolved from autocomplete → chat → agents.  
GitHub Copilot (or dev) innovations typically show up in Microsoft Copilot ~6 months later.  
SDD is emerging as the default way Devs collaborate with AI.

## How It Changes Work

**Humans Take the Lead:** Think, specify intent, refine constraints.  
**AI Builds the Artifacts:** Implements, tests, documents, iterates.

## The Core Loop (using Agents)

1. **Form the Team** (of Agents)
2. **Develop the Spec**
3. **Create the Plan**
4. **Build the thing**
5. **Repeat** with new knowledge

## Beyond Software Applicability

Prompt Engineering becomes Context Engineering.  
Anything with inputs, outputs, constraints, steps becomes executable:

- Account strategies
- Project plans
- Marketing workflows
- Onboarding processes
- Analyses & reports

## Resources and Continuous Learning

### Learn the Mindset

- [The New Identity of a Developer](https://github.blog/news-insights/octoverse/the-new-identity-of-a-developer-what-changes-and-what-doesnt-in-the-ai-era/) — GitHub Blog
- [The New Code](https://www.youtube.com/watch?v=8rABwKRsec4&t=2s) — AI Engineer World's Fair (video)
- [SDD: Sharpen your AI toolbox](https://www.youtube.com/watch?v=HY_JyxAZsiE) — AI Engineer Code Summit (video)

### Tools & Frameworks

- [Context7 MCP Server](https://github.com/mcp/upstash/context7) — Documentation & examples MCP Server for Agents
- [GitHub Spec-Kit](https://github.com/github/spec-kit) — OSS framework for SDD (use Agents, not vibing)
- [Awesome Copilot](http://aka.ms/awesome-copilot) (GH Copilot resources)
- [Advanced](https://docs.github.com/en/copilot/tutorials/use-custom-instructions) [Config](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)

### Continue Learning

- [AI Engineer](https://www.youtube.com/@aiDotEngineer) (YT Channel)
- [@DevDem](https://www.youtube.com/@DenDev) (Spec-Kit YT channel)
- [TL;DR Newsletter](https://tldr.tech/)

---

## Custom Agents

This repository includes custom GitHub Copilot agents:

- **python-expert** - Expert Python developer agent following best practices, using PyTest, and leveraging Context7 for documentation lookup
- **data-scientist** - Senior Data Scientist expert in Python data analysis, pandas, CSV/JSON processing, filesystem manipulation, schema description, and deriving insights from datasets
- **speckit agents** - Workflow agents for feature specification and planning

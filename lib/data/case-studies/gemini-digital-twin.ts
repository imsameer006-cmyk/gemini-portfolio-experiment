import type { CaseStudyData } from "@/lib/types";

export const geminiDigitalTwin: CaseStudyData = {
  projectSlug: "gemini-digital-twin",
  sections: [
    {
      label: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "Gemini is a digital twin platform developed at Infineon to support power module customization, simulation, and engineering approval workflows. Field Application Engineers used the system to configure modules, capture customer requirements, simulate circuit behavior, and submit projects for feasibility and prototyping review.",
        },
        {
          type: "paragraph",
          text: "Before Gemini, this process was fragmented across local tools, Excel sheets, email approvals, and long stakeholder conversations.",
        },
        {
          type: "meta-grid",
          fields: [
            { label: "Year", value: "2024" },
            { label: "Role", value: "UX Designer (co-lead)" },
            { label: "Product", value: "Pre-check · Digital Twin" },
            { label: "Domain", value: "B2B" },
            { label: "Users", value: "FAE, PAE, PMG, PJM" },
            { label: "Scope", value: "MVP" },
          ],
        },
        { type: "subheading", text: "My Role" },
        {
          type: "bullet-list",
          items: [
            "Defined the first functional MVP workflow (“Short Flow”)",
            "Mapped the multi-role approval flow",
            "Designed interaction models for module status",
            "Planned UI for module customization and submission",
            "Validated workflow through user testing",
          ],
        },
        { type: "subheading", text: "Outcome" },
        {
          type: "callout",
          text: "The Short Flow MVP was launched to 20 FAEs in China (Shanghai and Shenzhen). The new workflow centralized requirement capture inside Gemini, introduced visible approval states, reduced reliance on email, and provided real-time status visibility for all stakeholders.",
        },
      ],
    },

    {
      label: "Challenge",
      heading: "A System That Looked Complete — But Wasn't Usable",
      blocks: [
        {
          type: "two-col-list",
          left: {
            heading: "What existed",
            variant: "positive",
            items: [
              { label: "Module catalog browsing", detail: "Engineers could browse and filter from the full product catalog" },
              { label: "2D / 3D visualization", detail: "Real-time dimensional rendering for physical validation" },
              { label: "AR preview", detail: "Spatial overlay to verify modules on physical board configurations" },
              { label: "Schematic editor placeholders", detail: "Reserved UI zones for planned schematic tooling" },
            ],
          },
          right: {
            heading: "What was missing",
            variant: "warning",
            items: [
              { label: "Capture requirements", detail: "No structured way to define customer scope before module selection" },
              { label: "Attach modules to projects", detail: "Catalog entries existed in isolation — no link to project context" },
              { label: "Submit modules for approval", detail: "Approvals routed through email with no system-level tracking" },
              { label: "Track feasibility progress", detail: "Status arrived via manual follow-up, no single source of truth" },
            ],
          },
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/challenge-poc.png",
          caption: "Existing interface (PoC) — Module customization before workflow integration",
          alt: "Gemini existing interface showing the module customization PoC with annotated pain points",
        },
        {
          type: "callout",
          text: "The platform supported module visualization, but lacked the workflow infrastructure required for collaboration, approvals, and execution.",
        },
      ],
    },

    {
      label: "Context",
      heading: "Governance Complexity",
      blocks: [
        {
          type: "paragraph",
          text: "The approval process involved several engineering roles, creating governance complexity around ownership, feedback, permissions, and next steps. Approvals happened at the module level rather than the project level.",
        },
        {
          type: "role-list",
          items: [
            { abbr: "FAE", fullName: "Field Application Engineer",   description: "captures customer requirements and submits modules" },
            { abbr: "PAE", fullName: "Product Application Engineer", description: "performs technical feasibility assessment" },
            { abbr: "PMG", fullName: "Product Manager",              description: "conducts commercial evaluation" },
            { abbr: "PJM", fullName: "Project Manager",              description: "manages design specification and production integration" },
          ],
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/context-governance.png",
          caption: "Project-Level View of Module Governance — A single project with multiple modules, each moving through different approval stages with different role ownership",
          alt: "Diagram showing Project Alpha containing three modules at different approval stages, each connected to siloed external tools",
        },
        {
          type: "callout",
          text: "Without a shared governance layer, teams could review modules, but they could not clearly track ownership, feedback, permissions, or what needed to happen next.",
        },
      ],
    },

    {
      label: "Research",
      heading: "The Key Insight",
      blocks: [
        {
          type: "paragraph",
          text: "Interviews with FAEs across China, Germany, Austria, and Japan revealed the same pattern. The primary challenge was not module customization — it was status uncertainty.",
        },
        { type: "subheading", text: "After submission, FAEs often lost clarity on:" },
        {
          type: "bullet-list",
          items: [
            "Who currently owned the module",
            "Whether editing was allowed",
            "What approval stage it was in",
            "What action was required next",
          ],
        },
        {
          type: "callout",
          text: "The UX challenge was to make workflow states, ownership, and next actions visible inside the system.",
        },
      ],
    },

    {
      label: "Exploration",
      heading: "Designing Visibility Across the Short Flow",
      blocks: [
        {
          type: "paragraph",
          text: "The key design question was how to make module progress, ownership, permissions, and next actions visible without adding unnecessary complexity to the interface. We explored three approaches to represent workflow state and responsibility.",
        },
        {
          type: "exploration-cards",
          items: [
            {
              heading: "Full Workflow Timeline",
              description: "A timeline showing the complete lifecycle from Draft to Production.",
              strength: "Made the end-to-end approval process visible.",
              limitation: "Consumed too much space and became difficult to scan when users managed multiple modules.",
            },
            {
              heading: "Activity Feed",
              description: "A chronological log of decisions, comments, and stakeholder actions.",
              strength: "Supported traceability and helped explain what had happened.",
              limitation: "Required users to read through history before understanding the current state and ownership.",
            },
            {
              heading: "Compact State Indicators",
              description: "Small module-level indicators showing the current workflow state.",
              strength: "Supported fast recognition across module lists, tables, and detail pages.",
              limitation: "Needed additional cues for ownership, permissions, and rejection feedback.",
            },
          ],
        },
        {
          type: "callout",
          text: "The final direction combined compact workflow states with contextual ownership, editability, and feedback cues — helping users understand module progress, responsibility, allowed actions, and next steps without leaving the module view.",
        },
      ],
    },

    {
      label: "Solution",
      heading: "Designing the Short Flow Lifecycle",
      blocks: [
        {
          type: "paragraph",
          text: "To address status uncertainty, we designed Short Flow — a structured approval lifecycle that translated the engineering review process into visible system states.",
        },
        {
          type: "stages",
          items: [
            "Draft",
            "Pre-check",
            "Feasibility",
            "RS Generation",
            "RS Acceptance",
            "DS Generation",
            "DS Acceptance",
            "Production",
          ],
        },
        {
          type: "paragraph",
          text: "Each state mapped to a specific review stage and appeared directly in the module interface, helping users understand progress without relying on email or manual follow-ups.",
        },
        {
          type: "case-study-video",
          src: "/case-studies/gemini/solution-short-flow.mp4",
          caption: "Expanded Short Flow view showing how approval stages were surfaced inside the module interface.",
        },
      ],
    },

    {
      label: "Design Decisions",
      heading: "Key Interaction Decisions",
      blocks: [
        {
          type: “decisions”,
          startIndex: 0,
          items: [
            {
              heading: “Role-Based Self-Assignment”,
              body: “During Pre-check and Feasibility, progress depended on input from both PAE and PMG. When roles were not assigned, ownership became unclear and modules stalled. To reduce this ambiguity, we introduced self-assignment inside Short Flow.”,
              bullets: [
                “If no assignee exists, the primary CTA is “Assign to me””,
                “Once assigned, the module state updates to Assigned”,
                “Approval, rejection, and comments are enabled only for assigned users”,
              ],
            },
          ],
        },
        {
          type: “case-study-video”,
          src: “/case-studies/gemini/self-assignment.mp4”,
          caption: “Self-assignment made ownership explicit before review actions became available.”,
        },
        {
          type: “decisions”,
          startIndex: 1,
          items: [
            {
              heading: “Designing State Clarity”,
              body: “To make module progress scannable, each module displayed a persistent status badge combining color, icon, and text label. This made the state understandable without relying only on color, and kept status indicators consistent across module pages, project overview tables, and workflow notifications.”,
            },
          ],
        },
        {
          type: “case-study-image”,
          src: “/case-studies/gemini/state-clarity.png”,
          caption: “State indicators combined icon, color, and text labels to make module progress understandable at a glance.”,
          alt: “Short Flow Approval timeline panel showing Completed, Rejected, and Reopened states with annotated callouts”,
        },
        {
          type: “decisions”,
          startIndex: 2,
          items: [
            {
              heading: “Visualizing Ownership and Editability”,
              body: “During review, editing needed to be restricted to prevent version conflicts. Instead of silently disabling controls, the interface explained why the module was read-only and who currently owned the next action.”,
              bullets: [
                “Editing became read-only”,
                “A lock icon appeared in the interface”,
                “The responsible stakeholder was shown”,
                “The UI explained why editing was disabled”,
              ],
            },
            {
              heading: “Structured Rejection Feedback”,
              body: “Previously, rejection feedback arrived through email conversations, forcing FAEs to interpret comments and track required changes manually. In Gemini, rejection was integrated directly into the module workflow.”,
              bullets: [
                “The module state changed to Rejected”,
                “Feedback appeared inside the module view”,
                “Users were guided toward Revise & Resubmit”,
              ],
            },
          ],
        },
        {
          type: “callout”,
          text: “Together, these decisions turned Short Flow into an actionable workflow layer — making state, ownership, editability, and rejection feedback visible inside the module interface.”,
        },
      ],
    },

    {
      label: "Architecture",
      heading: "Module-Level Workflow Architecture",
      blocks: [
        {
          type: "paragraph",
          text: "The approval workflow in Gemini was designed at the module level, while each module remained part of a broader project structure.",
        },
        {
          type: "paragraph",
          text: "Because a single project could contain multiple modules, each module needed to move through Short Flow independently — with its own status, owner, editability, and feedback state. This prevented one delayed or rejected module from blocking the entire project.",
        },
        {
          type: "image-placeholder",
          caption: "Module-Level Workflow Architecture — Each module maintained its own workflow state, owner, editability, and feedback, allowing approvals to progress independently within the same project",
          tall: true,
        },
      ],
    },

    {
      label: "Interaction Flow",
      heading: "Project-to-Module Interaction",
      blocks: [
        {
          type: "paragraph",
          text: "Project submission was triggered at the project level, while review and evaluation happened at the module level.",
        },
        {
          type: "paragraph",
          text: "Once submitted, modules entered Pre-check as read-only items. PAE and PMG reviewed each module in parallel, after which the system either moved the module forward or reopened it with structured feedback.",
        },
        {
          type: "image-placeholder",
          caption: "Project-to-Module Interaction Flow — A project-level submission triggered module-level progression through the full Short Flow lifecycle",
          tall: true,
        },
      ],
    },

    {
      label: "Validation",
      heading: "User Acceptance Testing",
      blocks: [
        {
          type: "paragraph",
          text: "We conducted User Acceptance Testing with FAEs from China and Austria before the MVP launch.",
        },
        {
          type: "paragraph",
          text: "Participants completed core Short Flow tasks, including creating module drafts, customizing module parameters, attaching modules to a project, and submitting modules for review.",
        },
        {
          type: "paragraph",
          text: "The sessions helped validate whether users could understand the workflow state, identify their responsibilities, and complete review-related actions without relying on external email updates. Feedback led to refinements in icon placement, status communication, and interaction clarity before launch.",
        },
      ],
    },

    {
      label: "Impact",
      heading: "Before and After",
      blocks: [
        {
          type: "paragraph",
          text: "Before Gemini, FAEs tracked module feasibility through email conversations with engineering teams. Status updates, ownership, and rejection feedback were spread across multiple messages and tools.",
        },
        {
          type: "before-after",
          before: {
            heading: "Before Short Flow",
            items: [
              { label: "Status tracked through email", detail: "No visibility inside the product — engineers relied on inbox threads" },
              { label: "Ownership unclear", detail: "No system indicator of who was responsible for the next action" },
              { label: "Feedback scattered across tools", detail: "Rejection notes arrived separately, disconnected from the module" },
              { label: "Manual follow-ups required", detail: "FAEs had to chase engineering teams to learn review outcomes" },
            ],
          },
          after: {
            heading: "After Short Flow",
            items: [
              { label: "Status visible in the product", detail: "Approval stage surfaced directly inside the module interface" },
              { label: "Responsible owner shown", detail: "Assigned reviewer always visible alongside the current module state" },
              { label: "Feedback attached to workflow state", detail: "Rejection comments appeared in context, linked to the relevant module" },
              { label: "Next action clear", detail: "Guided CTAs showed what to do next based on the current state" },
            ],
          },
        },
        {
          type: "paragraph",
          text: "This reduced coordination overhead, made ownership clearer, and removed the need for manual status inquiries during the review process.",
        },
      ],
    },
  ],
};

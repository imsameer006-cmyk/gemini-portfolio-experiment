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
          type: "paragraph",
          text: "The project was originated by a project director, based on his firsthand observation of friction in the approval and customization process. The team included a PM, 3 data engineers, 2 frontend developers, 1 QA engineer, and an external UI designer who executed agreed-upon design decisions. Infineon is a traditional, engineering-first company that was culturally cautious about digital initiatives, which made the hard November 2025 launch deadline especially high-stakes. The deadline was driven by the need to present a solid use case to the board to secure further funding for the platform.",
        },
        { type: "subheading", text: "My Role" },
        {
          type: "bullet-list",
          items: [
            "Defined the first functional MVP workflow (“Short Flow”)",
            "Mapped the multi-role approval flow",
            "Designed interaction models for module status",
            "Validated workflow through user testing",
          ],
        },
        { type: "subheading", text: "Outcome" },
        {
          type: "callout",
          text: "The Short Flow MVP was launched to 50+ FAEs in China (Shanghai and Shenzhen). The new workflow centralized requirement capture inside Gemini, introduced visible approval states, reduced reliance on email, and provided real-time status visibility for all stakeholders.",
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
          mobileDetail: true,
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
          text: "The approval process involved several engineering roles, creating governance complexity around ownership, feedback, permissions, and next steps. Approvals happened at the module level rather than the project level. This module-level approval structure was inherited from decades-old organizational architecture at Infineon, not a decision made by the design team, which had no standing to contest it as a new project.",
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
        { type: "subheading", text: "Ownership and permission model" },
        {
          type: "two-col-list",
          left: {
            heading: "FAE / requester",
            variant: "neutral",
            items: [
              { label: "Owns the module draft", detail: "Captures requirements and edits the module before submission" },
              { label: "Receives rejected modules", detail: "A negative review returns ownership and unlocks the module for revision" },
              { label: "Acts on visible feedback", detail: "Reviewer comments and the next action remain attached to the module" },
            ],
          },
          right: {
            heading: "Review roles",
            variant: "neutral",
            items: [
              { label: "Self-assign before acting", detail: "PAE and PMG make responsibility explicit before review actions are enabled" },
              { label: "Review a locked module", detail: "The module becomes read-only during review to prevent conflicting edits" },
              { label: "Expose the current owner", detail: "The responsible role or person is shown alongside the workflow state" },
            ],
          },
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/context-governance.png",
          mobileDetail: true,
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
          text: "Interviews in Germany, Austria, and Japan supported early discovery and needs assessment. China was the explicit priority market, the platform was localized into Chinese, and the demand driving Short Flow specifically came from Chinese FAEs. The primary challenge was not module customization — it was status uncertainty.",
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
          type: "paragraph",
          text: "During discovery interviews, Chinese FAEs specifically wanted a detailed activity-feed-style solution with granular notifications. Engineering, manufacturing, and feasibility leads refused this direction because it would expose internal operational processes they did not want made visible. Separately, the design team's original proposals for restructuring the approval workflow itself, not just its visual representation, were rejected outright. The mandate was to digitize the existing physical workflow as-is first, and improve it in a later phase, which constrained design freedom to interaction, labeling, and staging rather than process reinvention.",
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
          type: "callout",
          text: "Short Flow was not just a UI tab. It was a role-based workflow model that made ownership, review state, editability, permissions, and next actions visible at module level.",
        },
        {
          type: "case-study-video",
          src: "/case-studies/gemini/solution-short-flow.mp4",
          mobileDetail: true,
          controls: true,
          caption: "Expanded Short Flow view showing how approval stages were surfaced inside the module interface.",
        },
        {
          type: "paragraph",
          text: "On the Gemini homepage, project-band thumbnails showing modules within a project clipped module names illegibly, and this became worse when a project contained more than 3 modules. The author proposed showing full module names instead of the clipped thumbnail view. Manufacturing engineering preferred keeping the existing view, and the team was resource- and time-constrained under the November 2025 MVP deadline. The proposal was not accepted, and the existing clipped view shipped as-is.",
        },
      ],
    },

    {
      label: "Design Decisions",
      heading: "Key Interaction Decisions",
      blocks: [
        {
          type: "decisions",
          startIndex: 0,
          items: [
            {
              heading: "Designing the Workflow Grammar",
              body: "We treated workflow visibility as a connected system rather than a single status label. This decision mapped pre-existing organizational vocabulary and process, established through stakeholder workshops, a full permission matrix, and workflow mapping in Miro, rather than inventing a new UI pattern. Each module needed to communicate five separate pieces of information that changed together as work progressed.",
              bullets: [
                "Stage showed where the module was in the Short Flow lifecycle",
                "Status showed the current review outcome or condition",
                "Owner showed who was responsible for moving the module forward",
                "Permission showed whether the module could be edited or reviewed",
                "Next action translated the current state into a clear task",
              ],
            },
          ],
        },
        {
          type: "decisions",
          startIndex: 1,
          items: [
            {
              heading: "Role-Based Self-Assignment",
              body: "During Pre-check and Feasibility, progress depended on input from both PAE and PMG. When roles were not assigned, ownership became unclear and modules stalled. To reduce this ambiguity, the author proposed self-assignment inside Short Flow. This formalized an existing informal analog already used in the organization, where reviewers self-selected modules on a first-come basis via email, with FAEs guessing at who currently owned a module. The author also proposed real-time notifications for workflow activity, including module status changes, assignments, and feedback. The team responded positively to the idea, but it was shelved for a future phase because the backend, feasibility, and manufacturing team was small, specialized, and not resourced or ready for that level of process exposure within the MVP timeline.",
              bullets: [
                "If no assignee exists, the primary CTA is “Assign to me”",
                "Once assigned, the module state updates to Assigned",
                "Approval, rejection, and comments are enabled only for assigned users",
              ],
            },
          ],
        },
        {
          type: "case-study-video",
          src: "/case-studies/gemini/self-assignment.mp4",
          mobileDetail: true,
          controls: true,
          caption: "Self-assignment made ownership explicit before review actions became available.",
        },
        {
          type: "decisions",
          startIndex: 2,
          items: [
            {
              heading: "Parallel Pre-check Decision Rule",
              body: "Pre-check required both technical input from PAE and commercial input from PMG. This translated an existing organizational process and vocabulary into the product, using stakeholder workshops, a full permission matrix, and Miro workflow mapping rather than an invented UI pattern. The workflow made their parallel decisions visible and converted the combined result into one clear module-level outcome.",
              bullets: [
                "PAE and PMG reviewed the module in parallel",
                "Two positive results allowed the module to progress",
                "Any negative result returned the module to the FAE",
                "The module unlocked for revision and the requester was notified",
                "Reviewer feedback remained visible and actionable inside the module",
              ],
            },
          ],
        },
        {
          type: "decisions",
          startIndex: 3,
          items: [
            {
              heading: "Designing State Clarity",
              body: "This decision was a 50/50 collaboration between the author and their UX colleague, decided in a joint workshop. To make module progress scannable, each module displayed a persistent status badge combining color, icon, and text label. This made the state understandable without relying only on color, and kept status indicators consistent across module pages, project overview tables, and workflow notifications.",
            },
          ],
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/state-clarity.png",
          mobileDetail: true,
          caption: "State indicators combined icon, color, and text labels to make module progress understandable at a glance.",
          alt: "Short Flow Approval timeline panel showing Completed, Rejected, and Reopened states with annotated callouts",
        },
        {
          type: "decisions",
          startIndex: 4,
          items: [
            {
              heading: "Visualizing Ownership and Editability",
              body: "During review, editing needed to be restricted to prevent version conflicts. The decision reflected pre-existing organizational vocabulary and process surfaced through stakeholder workshops, a full permission matrix, and workflow mapping in Miro, rather than a newly invented UI pattern. Instead of silently disabling controls, the interface explained why the module was read-only and who currently owned the next action.",
              bullets: [
                "Editing became read-only",
                "A lock icon appeared in the interface",
                "The responsible stakeholder was shown",
                "The UI explained why editing was disabled",
              ],
            },
          ],
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/visualizing-ownership.png",
          mobileDetail: true,
          caption: "Lock state and owner identity were embedded directly in each timeline row, making editability and responsibility visible at the point of action.",
          alt: "Gemini UI showing the Update: Requirements Gathering card with an open lock icon and owner name visible in the workflow state",
        },
        {
          type: "decisions",
          startIndex: 5,
          items: [
            {
              heading: "Structured Rejection Feedback",
              body: "Previously, rejection feedback arrived through email conversations, forcing FAEs to interpret comments and track required changes manually. In Gemini, rejection was integrated directly into the module workflow. Structured Rejection Feedback began as the author's original proposal and was developed further in a workshop with the PM, a data engineer, and the engineering director. The engineering director and PM initially pushed back, questioning why every workflow stage needed its own feedback and resubmit record. The argument for the record was that it had value beyond the immediate decision: as a reference if the module was later approved, and as a diagnostic record if it failed. It also removed the burden on individuals to privately maintain their own notes to recall context, and after time spent building alignment, the team ultimately adopted it.",
              bullets: [
                "The module state changed to Rejected",
                "Feedback appeared inside the module view",
                "Users were guided toward Revise & Resubmit",
              ],
            },
          ],
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/rejection-feedback.png",
          mobileDetail: true,
          caption: "Rejection feedback became a structured workflow state instead of a separate email thread.",
          alt: "Short Flow Approval panel showing Pre-check: Rejected state with inline reviewer comments from Thandiwe Mangana and Gianfranco Mauro, and a Revise & Resubmit CTA",
        },
        {
          type: "callout",
          text: "Together, these decisions turned Short Flow into an actionable workflow layer — making state, ownership, editability, and rejection feedback visible inside the module interface.",
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
          type: "case-study-image",
          src: "/case-studies/gemini/architecture-module-workflow.png",
          mobileDetail: true,
          caption: "Module-Level Workflow Architecture — Each module maintained its own workflow state, owner, editability, and feedback, allowing approvals to progress independently within the same project",
          alt: "Diagram showing Project Alpha containing three modules at different approval stages — Module A Approved, Module B Rejected at Pre-check, Module C In Progress at RS Generation — each with independent state, owner, editability, and feedback properties",
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
          text: "Once submitted, modules entered Pre-check as read-only items. PAE and PMG reviewed each module in parallel. Two positive results allowed progression; any negative result returned the module to the FAE, unlocked it for revision, notified the requester, and surfaced the feedback as the next actionable step.",
        },
        {
          type: "case-study-image",
          src: "/case-studies/gemini/interaction-flow.png",
          mobileDetail: true,
          caption: "Project-to-Module Interaction Flow — PAE and PMG review in parallel, then the combined decision either continues the module or returns it to FAE for revision",
          alt: "Diagram showing project-level submission and a conditional PAE and PMG review decision: approve continues the module, while reject returns it to FAE for revision and resubmission",
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
          text: "The sessions helped validate whether users could understand the workflow state, identify their responsibilities, and complete review-related actions without relying on external email updates. The real UAT finding was that FAEs took too long navigating to find options; the fix, including iconography improvements and guide overlays, was scoped but pushed to the backlog, not shipped before the MVP launch.",
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

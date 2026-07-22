import type { CaseStudyData } from "@/lib/types";

export const plmCollabspace: CaseStudyData = {
  projectSlug: "plm-collabspace",
  sections: [
    {
      label: "Overview",
      heading: "A platform to connect what already existed",
      blocks: [
        {
          type: "paragraph",
          text: "Rohde & Schwarz's PLM teams held deep expertise across eight domains. None of it was visible outside each domain's walls.",
        },
        {
          type: "paragraph",
          text: "PLM Collabspace was a leadership initiative to fix that — a shared platform to make organisational knowledge discoverable across functions. Not to replace existing tools. To connect them.",
        },
        { type: "subheading", text: "My Role" },
        {
          type: "callout",
          text: "Sole designer and researcher on the project. I led design, research, and stakeholder workshops; content and reel production were coordinated in collaboration with a small production team.",
        },
        { type: "subheading", text: "Outcome" },
        {
          type: "callout",
          text: "Eight domains launched. 2,000+ employees had platform access, onboarded in batches as department heads provided their lists. Platform remained active after rollout.",
        },
      ],
    },

    {
      label: "Challenge",
      heading: "Eight domains, no shared view",
      blocks: [
        {
          type: "two-col-list",
          left: {
            heading: "What already existed",
            variant: "positive",
            items: [
              { label: "Internal social network", detail: "Employees shared updates, news, and departmental feeds across the organization" },
              { label: "Department-level pages", detail: "Each team maintained its own space for documentation and internal communication" },
              { label: "Documentation and communication tools", detail: "Messaging, file sharing, and project workflows already in place across functions" },
              { label: "Deep expertise within every domain", detail: "Every department held specialized knowledge, processes, and institutional know-how" },
            ],
          },
          right: {
            heading: "What was missing",
            variant: "warning",
            items: [
              { label: "Cross-domain visibility", detail: "Expertise and initiatives inside each domain remained invisible to the rest of the organization" },
              { label: "A shared discovery layer", detail: "No way to find what other teams were working on or who held relevant knowledge" },
              { label: "A participation model that worked", detail: "Previous platforms were built and people were invited — but nobody came back" },
              { label: "A reason to use another platform", detail: "Nobody had answered why this space should exist alongside everything that already did" },
            ],
          },
        },
        {
          type: "closing-line",
          text: "The tools weren't missing. The connection between them was.",
        },
        {
          type: "paragraph",
          text: "I'd initially mapped out every domain across the company before being told the platform would cover only the top relevant picks — not the full organisational chart.",
        },
      ],
    },

    {
      label: "Context",
      heading: "The question every conversation started with",
      blocks: [
        {
          type: "pull-quote",
          text: "\"We already have our internal page. Why maintain another one?\"",
        },
        {
          type: "paragraph",
          text: "The software development department head asked it first, in one of my earliest conversations, and some version of it came up in every conversation after. It wasn't pushback. It was a reasonable response to a real pattern: platforms had been built before, pages went live, people were invited, nothing happened.",
        },
        {
          type: "paragraph",
          text: "The resistance wasn't new. Nobody had addressed it.",
        },
        {
          type: "context-cards",
          items: [
            {
              heading: "No differentiated value",
              body: "No clear answer to what the platform offered that existing tools didn't.",
            },
            {
              heading: "No ownership model",
              body: "No defined steward meant no accountability — and no continuity.",
            },
            {
              heading: "No content at launch",
              body: "Nothing to engage with. No reason to return.",
            },
          ],
        },
      ],
    },

    {
      label: "First Attempt",
      heading: "The first design answered the wrong question.",
      blocks: [
        {
          type: "paragraph",
          text: "I joined the project with access to the design system, but without context on what the platform needed to do. I built a first UI aligned to the system, assuming visual and system alignment were the work. I presented it first to my supervisor and the department director, who said it was visually beautiful, but would not serve any purpose. The reason to use Collabspace instead of a department's own page was not how it looked; the requirements were different. I was allowed to present it to content owners anyway as a base for the initial meeting, and the same reaction held. That rejection opened the real thread: understanding stakeholders' mindset, motivations, and wants, and pivoting quickly once it was clear the job was solving the problem, not satisfying aesthetic preference.",
        },
      ],
    },

    {
      label: "Research",
      heading: "What the interviews surfaced",
      blocks: [
        {
          type: "paragraph",
          text: "Getting time with domain and content owners was genuinely difficult. The issue was calendar scarcity, not refusal: department heads, managers, and leadership had little open slot time, and one owner took longer than the rest to reach. Repeated re-booking is what worked.",
        },
        {
          type: "paragraph",
          text: "I interviewed department heads and content owners across the PLM organisation — the people who would decide whether the platform earned contribution or quietly went inactive — through structured interviews first, then post-interview surveys to validate patterns, and three workshops to build alignment before, during, and after design.",
        },
        {
          type: "paragraph",
          text: "One department head pushed back early: why maintain two pages when one was already working? The concern wasn't the platform's design — it was the ongoing effort of keeping a second page alive. Once they saw what Collabspace was actually for — being found by people outside the department, not replacing the internal page — the tone shifted: nods, questions, and soon suggestions of their own — content they already had that could simply move onto the platform.",
        },
        {
          type: "context-cards",
          items: [
            {
              heading: "Value wasn't visible, so investment felt unjustified",
              body: "\"Collaboration\" wasn't a good enough reason. Nobody could see what made this different.",
            },
            {
              heading: "No ownership meant no continuity",
              body: "Without accountability, participation faded — the same way it had in previous attempts.",
            },
          ],
        },
        { type: "subheading", text: "The Key Insight" },
        {
          type: "callout",
          text: "The director's reasoning, as I remember it, was direct: this was a cross-collaboration, knowledge-sharing platform, and visuals weren't the priority — enablement was. Content owners didn't put it in the same words, but the reaction was the same flatness. In hindsight that tracked: this was an internal, engineering- and research-facing audience — people who aren't moved by polish so much as by whether something is useful. The challenge wasn't storage. It was visibility. I did not walk in with that reframe. It emerged from the rejected first design and the two reactions that followed it. Every domain already stored knowledge; nobody could discover it across boundaries.",
        },
      ],
    },

    {
      label: "Synthesis",
      heading: "From research to direction",
      blocks: [
        {
          type: "paragraph",
          text: "Across the interviews, surveys, and three workshops, five themes kept resurfacing: discoverability, visibility, ownership, participation, relevance. I turned those into four principles I could test every design decision against: create visibility, reduce duplication, support ownership, make contribution sustainable.",
        },
      ],
    },

    {
      label: "Exploration",
      heading: "Designing inside the constraints",
      blocks: [
        {
          type: "paragraph",
          text: "SAP workspaces gave the platform a hard structural framework. There was not open latitude to invent a different top-level architecture from scratch. The real design freedom was inside that structure: layout, widget placement and prioritisation, content arrangement, and what the structure was made to mean.",
        },
        {
          type: "paragraph",
          text: "My first instinct was a single shared space — every content owner posting and editing in one place, no per-domain containers. That still fit inside SAP's structure; the question was never architecture, it was whether one shared space or eight separated ones would actually get used. But the same openness was the problem: without domain containers, everyone's content would blend together, and nobody's work would read as theirs. That's what pushed the direction toward hub-plus-domains — one shared space at the top, but each domain still bounded and owned.",
        },
        {
          type: "paragraph",
          text: "A second constraint surfaced around access: I'd assumed every department employee would simply get access. Instead, department heads handed me batched name lists, round by round — so I wrote a script, with help from an AI coding assistant, to search the company portal and pull the corresponding emails, and onboarded people in successive waves.",
        },
        {
          type: "exploration-cards",
          items: [
            {
              heading: "Single unified feed",
              description: "",
              strength: "Maximum cross-domain visibility.",
              limitation: "Domain context disappears. Ownership dissolves.",
            },
            {
              heading: "Separate domain pages",
              description: "",
              strength: "Local ownership preserved.",
              limitation: "The silos that already existed get replicated. Same problem, new location.",
            },
            {
              heading: "Hub + domain spaces",
              description: "Chosen direction",
              strength: "Visibility at the hub. Ownership at the domain.",
              limitation: "Required clear governance — who owns what, and what belongs where.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "A real content boundary also existed. Material considered highly confidential stayed behind department walls — internal meetings, password-protected department pages, and Confluence — while publishable content came from channels already used organisation-wide, including SharePoint, Confluence, and the company's public web presence. That boundary was the department heads' pre-existing practice, not a governance model I designed, and formal written cross-domain governance remained an open question at handover.",
        },
        {
          type: "closing-line",
          text: "Only one structure answered both sides of the problem at the same time.",
        },
      ],
    },

    {
      label: "Solution",
      heading: "The hub and the domain spaces",
      blocks: [
        {
          type: "two-col-list",
          left: {
            heading: "Global Hub",
            variant: "neutral",
            items: [
              "One entry point. Surfaced knowledge, initiatives, and expertise across all domains.",
            ],
          },
          right: {
            heading: "Domain Spaces",
            variant: "neutral",
            items: [
              "Eight dedicated spaces. Each domain owned its own. Each space had one purpose: making its work visible to the rest of the organisation.",
            ],
          },
        },
        {
          type: "callout",
          text: "This page isn't for your team. It's for everyone else to find you.",
        },
        {
          type: "case-study-video",
          src: "/case-studies/collabspace/global-hub.mp4",
          caption: "One entry point surfacing knowledge, reels, and ownership across all eight PLM domains.",
          controls: true,
          mobileDetail: true,
        },
      ],
    },

    {
      label: "Design Decisions",
      heading: "Key Decisions",
      blocks: [
        {
          type: "decisions-cdo",
          items: [
            {
              heading: "Pilot one domain before scaling",
              challenge: "Domain spaces risked feeling like duplicates of existing pages. Committing the full approach to all eight domains simultaneously introduced too much validation risk, so the first domain needed to be the lowest-hanging fruit.",
              decision:
                "Position them as outward-facing windows — not for internal teams, but for the rest of the organisation to discover them. Launch my own PLM department page first. Direct, daily access to the department director, an agile coach, and scrum masters made it possible to validate the model before scaling it to the other seven domains. No one asked me to launch all eight at once — piloting was my own call, made because it was the lowest-risk, most obvious place to start. Choosing my own department for it wasn't weighed against other domains either; it was the practical option, given the access I already had to the director and the team.",
              outcome:
                "Building the pilot meant iterating on multiple layout and widget-priority arrangements. The final template was chosen collectively in a working meeting with the director and an agile coach. Content for the pilot came from SharePoint, Confluence, and both public and password-protected internal sources, decided jointly with the director. One head — the most visibly skeptical in the room — sat arms crossed at the start, not invested, then leaned in and started asking questions once he saw the page working. One of them asked that the hero section's branding graphic be replaced with an infographic more specific to their department's work. Another wanted the contact section restructured — one larger card for the department head, smaller stacked cards for the rest of the team, rather than a uniform vertical stack. The structure otherwise survived intact — which told me the model worked when people could see it, in a way it hadn't when I'd only described it.",
            },
            {
              heading: "Ownership designed in, not added later",
              challenge: "Platforms without stewardship go inactive.",
              decision:
                "Name content owners per domain. Define publishing rhythm. Make responsibilities explicit from the start.",
              outcome:
                "Domain heads weren't invited to participate — they were given a role only they could fill.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Seven of eight domain owners came through normal back-and-forth, with ordinary scheduling friction rather than conflict. One owner was notably reluctant throughout: a marketing manager, not the head of marketing, assigned to own and manage that page. The head of marketing was supportive and set up a small joint workshop with himself, the reluctant manager, and me. A business trip stalled progress further because she was the sole assigned owner for that page. After she returned, persistent re-approach eventually led her to participate; the root cause of her initial reluctance was never fully clear, and what worked was patience, not escalation.",
        },
        {
          type: "decisions-cdo",
          startIndex: 2,
          items: [
            {
              heading: "Content built into the design, not added after",
              challenge: "Previous platforms had launched empty and stayed that way.",
              decision:
                "Every domain space launches with content on day one. Two formats anchor each space: a thirty-second domain reel and a featured home page video. Reels were uploaded once through the hub dashboard, then pulled onto whichever domain pages needed them.",
              outcome:
                "Visitors had a reason to engage from the first visit — and a reason to return.",
            },
          ],
        },
        {
          type: "case-study-image",
          src: "/case-studies/collabspace/domain-space-content.png",
          caption: "Reels are the platform's primary content unit — the format through which each domain makes its work discoverable to the rest of the organisation.",
          alt: "PLM Collabspace domain space showing domain reels, network activity, and domain leads with an annotation pointing to content available from day one",
          mobileDetail: true,
        },
        {
          type: "decisions-cdo",
          startIndex: 3,
          items: [
            {
              heading: "Awareness designed, not assumed",
              challenge: "Valuable platforms still fail if employees don't know they exist.",
              decision:
                "Build a deliberate launch campaign. Internal network post for the digital audience. Cafeteria projector display for everyone else.",
              outcome: "Adoption started with visibility. Visibility was designed.",
            },
          ],
        },
      ],
    },

    {
      label: "Content Strategy",
      heading: "The content model",
      blocks: [
        {
          type: "paragraph",
          text: "Domain experts and content owners chose the topics and owned the underlying knowledge. Reel and video production was a collaboration with another working student from the content-creation and post-production department. We handled equipment and booked available conference rooms and halls around dates provided by content owners and department heads, then recorded together on site. Footage was uploaded through SharePoint and handed to the post-production team for editing. I reviewed edited drafts with content owners and my own department, catching issues such as branding mismatches before anything published.",
        },
        {
          type: "paragraph",
          text: "On what got recorded and how, I had no say — that was the content owners' call, and rightly so. I sat in their planning sessions to understand their tools and process, but the creative and topical decisions stayed entirely theirs.",
        },
        {
          type: "two-col-list",
          left: {
            heading: "Domain Reels",
            variant: "neutral",
            items: [
              "Thirty-second videos. Each domain's work and expertise — fast to consume, easy to share.",
            ],
          },
          right: {
            heading: "Featured Video",
            variant: "neutral",
            items: ["Top of every domain home page. First thing a new visitor sees."],
          },
        },
      ],
    },

    {
      label: "Impact",
      heading: "Before and After",
      blocks: [
        {
          type: "before-after",
          before: {
            heading: "Before",
            items: [
              { label: "Knowledge trapped in silos", detail: "Expertise and initiatives inside each domain remained invisible to the rest of the organisation." },
              { label: "Previous platforms abandoned", detail: "Pages were built and people were invited — but nobody came back." },
              { label: "Discovery relied on personal networks", detail: "Finding what other teams were working on depended on knowing the right person." },
              { label: "No content, no reason to return", detail: "Without a model for sustainable publishing, platforms launched empty and stayed that way." },
            ],
          },
          after: {
            heading: "After",
            items: [
              { label: "Eight domain communities live", detail: "Every major PLM domain launched with its own space — owned, staffed, and active." },
              { label: "2,000+ employees onboarded", detail: "Employees had platform access, onboarded in batches as department heads provided their lists." },
              { label: "Cross-domain knowledge discoverable", detail: "Initiatives, expertise, and domain reels surfaced through the global hub for the first time." },
              { label: "Sustainable content production", detail: "Six of eight domains sustained regular publishing after the campaign ended. The other two slowed after launch; my read is that those domains likely had less frequent shareable material." },
            ],
          },
        },
        {
          type: "closing-line",
          text: "Collabspace gave organisational knowledge a place to be found — not just stored.",
        },
      ],
    },

    {
      label: "Reflection",
      heading: "Adoption is a design problem.",
      blocks: [
        {
          type: "paragraph",
          text: "I started with the wrong belief: that design-system alignment and visual polish carried inherent merit, even before the work proved it served a stakeholder need.",
        },
        {
          type: "paragraph",
          text: "The two rejections corrected that quickly. If a platform doesn't answer \"why should I use this,\" no launch campaign will compensate.",
        },
        {
          type: "paragraph",
          text: "I've come to think internal platforms don't fail because they're badly designed. They fail because they're never taken seriously past the initial curiosity — started with interest, then left unattended once nobody's explicitly responsible for keeping them alive. No duties assigned, no value clearly defined, so the interest fades and the platform does too.",
        },
        {
          type: "paragraph",
          text: "The most important decision was treating stakeholder resistance as a design brief rather than an obstacle to manage. Previous attempts built the platform and expected adoption to follow. This project started with the question they skipped.",
        },
      ],
    },
  ],
};

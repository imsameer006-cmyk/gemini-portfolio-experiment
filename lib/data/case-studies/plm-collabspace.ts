import type { CaseStudyData } from "@/lib/types";

export const plmCollabspace: CaseStudyData = {
  projectSlug: "design-system",
  sections: [
    {
      label: "Overview",
      heading: "Built to connect what already existed.",
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
          text: "Solo designer and researcher, from discovery to rollout. Research → synthesis → platform design → content production → launch campaign.",
        },
        { type: "subheading", text: "Outcome" },
        {
          type: "callout",
          text: "Eight domain communities launched. 2,000+ employees reached. Platform remained active after rollout.",
        },
      ],
    },

    {
      label: "Challenge",
      heading: "Everything existed. Nothing connected.",
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
      ],
    },

    {
      label: "Context",
      heading: "The resistance was the real problem.",
      blocks: [
        {
          type: "pull-quote",
          text: "We already have our internal page. Why maintain another one?",
        },
        {
          type: "paragraph",
          text: "This question came up in every conversation. It wasn't pushback — it was a reasonable response to a real pattern. Platforms had been built before. Pages went live. People were invited. Nothing happened. The platforms were abandoned.",
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
        {
          type: "closing-line",
          text: "The resistance wasn't an obstacle. It was the most useful signal available.",
        },
      ],
    },

    {
      label: "Research",
      heading: "Interviews revealed what nobody had asked before.",
      blocks: [
        {
          type: "paragraph",
          text: "I interviewed department heads and content owners across the PLM organisation — the people who would decide whether the platform earned contribution or quietly went inactive.",
        },
        {
          type: "paragraph",
          text: "Structured interviews first. Post-interview surveys to validate patterns. Three workshops to build alignment before, during, and after design.",
        },
        {
          type: "context-cards",
          items: [
            {
              heading: "Teams feared duplication, not change",
              body: "Another platform felt like more of the same work on top of pages they already maintained.",
            },
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
          text: "The challenge wasn't storage. It was visibility. Every domain already stored knowledge. Nobody could discover it across boundaries. That single reframe changed the design question entirely.",
        },
      ],
    },

    {
      label: "Synthesis",
      heading: "From research to direction.",
      blocks: [
        {
          type: "synthesis-flow",
          rows: [
            {
              label: "Research inputs",
              items: ["Stakeholder interviews", "Surveys", "Workshops"],
            },
            {
              label: "Recurring themes",
              items: ["Discoverability", "Visibility", "Ownership", "Participation", "Relevance"],
            },
            {
              label: "Design principles",
              items: [
                "Create visibility",
                "Reduce duplication",
                "Support ownership",
                "Make contribution sustainable",
              ],
            },
          ],
        },
        {
          type: "synthesis-table",
          headers: ["Research insight", "Platform requirement"],
          rows: [
            ["Knowledge difficult to discover", "Shared global hub"],
            ["Expertise hidden within teams", "Domain visibility layer"],
            ["Resistance to another platform", "Clear value beyond existing tools"],
            ["Adoption concerns", "Defined ownership model"],
            ["Need for ongoing relevance", "Sustainable content strategy"],
          ],
        },
      ],
    },

    {
      label: "Exploration",
      heading: "Three structures. One answer.",
      blocks: [
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
          type: "closing-line",
          text: "Only one structure answered both sides of the problem at the same time.",
        },
      ],
    },

    {
      label: "Solution",
      heading: "Visibility at the top. Ownership at the domain.",
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
              heading: "Reframing what domain spaces were for",
              challenge: "Domain spaces risked feeling like duplicates of existing pages.",
              decision:
                "Position them as outward-facing windows — not for internal teams, but for the rest of the organisation to discover them.",
              outcome:
                "Domain heads understood their role on the platform. Resistance shifted to investment.",
            },
            {
              heading: "Ownership designed in, not added later",
              challenge: "Platforms without stewardship go inactive.",
              decision:
                "Name content owners per domain. Define publishing rhythm. Make responsibilities explicit from the start.",
              outcome:
                "Domain heads weren't invited to participate — they were given a role only they could fill.",
            },
            {
              heading: "Pilot one domain before scaling",
              challenge:
                "Committing the full approach to all eight domains simultaneously introduced too much validation risk.",
              decision: "Launch one domain first. Validate the model before scaling it.",
              outcome:
                "A live, working example proved more persuasive to hesitant domain heads than any presentation could.",
            },
            {
              heading: "Content built into the design, not added after",
              challenge: "Previous platforms had launched empty and stayed that way.",
              decision:
                "Every domain space launches with content on day one. Two formats anchor each space: a thirty-second domain reel and a featured home page video.",
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
          startIndex: 4,
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
      heading: "Technology doesn't create engagement. Content does.",
      blocks: [
        {
          type: "paragraph",
          text: "Domain experts owned the knowledge and chose the topics. Everything else was coordinated centrally — keeping the contribution bar low for domain teams and production consistent across the platform.",
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
      label: "Validation",
      heading: "The pilot tested the model, not just the design.",
      blocks: [
        {
          type: "paragraph",
          text: "After the first domain launched, retrospective interviews were conducted with early users — not about usability, but about relevance, ownership, and whether the platform offered something existing tools didn't.",
        },
        {
          type: "paragraph",
          text: "What held up became the template. What needed adjustment was fixed before it could compound across eight spaces.",
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
              { label: "2,000+ employees reached", detail: "The platform scaled across the full PLM organisation in the first rollout phase." },
              { label: "Cross-domain knowledge discoverable", detail: "Initiatives, expertise, and domain reels surfaced through the global hub for the first time." },
              { label: "Sustainable content production", detail: "A publishing framework that outlasted launch — content kept coming after the campaign ended." },
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
          text: "If a platform doesn't answer \"why should I use this,\" no launch campaign will compensate. The most important decision wasn't layout, navigation, or content format.",
        },
        {
          type: "paragraph",
          text: "It was treating stakeholder resistance as a design brief rather than an obstacle to manage.",
        },
        {
          type: "paragraph",
          text: "Previous attempts built the platform and expected adoption to follow. This project started with the question they skipped.",
        },
      ],
    },
  ],
};

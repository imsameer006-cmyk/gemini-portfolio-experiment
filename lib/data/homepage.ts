export const homepageContent = {
  hero: {
    headingSegments: [
      { text: "Building clarity ", italic: true },
      { text: "out of", italic: false },
      { text: " complexity.", italic: true },
    ],
    headingText: "Building clarity out of complexity.",
    statement:
      "I design products through systems thinking and deep understanding that work for people and perform for business.",
    signals: [
      { value: "Research", label: "Evidence-Led" },
      { value: "Strategy", label: "Outcome-Focused" },
      { value: "Systems", label: "Creating Clarity" },
      { value: "Craft", label: "Execution Excellence" },
    ],
  },
  work: {
    eyebrow: "Selected Work",
    headline: "What I've shipped.",
    summary: "Each project is a case study in systems thinking and human-centered design.",
  },
  about: {
    eyebrow: "About",
    headline: "The designer behind the systems.",
    body:
      "Product Designer with 10+ years across digital products — engineering, customer research, and business — specialising in enterprise UX for complex workflows. At Infineon and Rohde & Schwarz, I've designed multi-stakeholder systems that translate complexity into intuitive, scalable experiences balancing user needs, business goals, and technical constraints.",
    mantra: ["Think in systems.", "Design for humans.", "Build with evidence.", "Simplify complexity."],
    facts: [
      "Systems Design",
      "Enterprise UX",
      "User Research",
      "Product Strategy",
      "Complex Workflows",
      "AI-Native Products",
    ],
  },
  moments: {
    eyebrow: "Selected Moments",
    headline: "In Practice.",
    body:
      "Product design is ultimately about working with people. These moments capture the conversations, workshops, and collaborations that transform ambiguity into shared understanding and shape the systems behind the final experience.",
    items: [
      {
        title: "Facilitating Discussions",
        company: "Rohde & Schwarz",
        location: "Munich",
        imageSrc: "/Gallery/editorial/1.webp",
        imageAlt: "Work moment at Rohde and Schwarz in Munich",
      },
      {
        title: "Cross-functional Collaboration",
        company: "Infineon",
        location: "Munich",
        imageSrc: "/Gallery/editorial/2.webp",
        imageAlt: "Work moment at Infineon Technologies in Munich",
      },
      {
        title: "Content Co-creation",
        company: "Infineon",
        location: "Munich",
        imageSrc: "/Gallery/editorial/3.webp",
        imageAlt: "Work moment at Infineon Technologies in Munich",
      },
      {
        title: "Systems Mapping",
        company: "Rohde & Schwarz",
        location: "Munich",
        imageSrc: "/Gallery/editorial/4.webp",
        imageAlt: "Work moment at Rohde and Schwarz in Munich",
      },
      {
        title: "Design-Engineering Alignment",
        company: "Infineon",
        location: "Munich",
        imageSrc: "/Gallery/editorial/5.webp",
        imageAlt: "Work moment at Infineon Technologies in Munich",
      },
      {
        title: "Eye-Tracking Debrief",
        location: "Technische Hochschule Augsburg",
        imageSrc: "/Gallery/editorial/6-v2.webp",
        imageAlt:
          "Reviewing an interface with colleagues during an eye-tracking debrief at Technische Hochschule Augsburg",
      },
    ],
  },
  philosophy: {
    eyebrow: "My Design Philosophy",
    statement:
      "Design is the practice of understanding complexity, uncovering what matters, and shaping it into experiences people can understand and use.",
    body:
      "Over the years, I've learned that good design isn't about adding more — it's about understanding what matters and making it clear.",
  },
  process: {
    eyebrow: "How I Work",
    headline: "Process as a design tool.",
    note:
      "The process is not linear. Real design work is recursive — each step sends you back to re-examine earlier assumptions with sharper clarity.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    headline: "What people say.",
    items: [
      {
        quote:
          "Sameer has the rare ability to dive deep into the topics that are usually avoided due to complexity. Very knowledgeable and very kind — always happy to help and contribute. Was a great pleasure to work with him.",
        name: "Yeva Lalayan",
        role: "Research & Design Lead",
        company: "Infineon Technologies",
        avatar: "/yeva.png",
      },
      {
        quote:
          "We valued Sameer for his initiative, sound judgment, and dependable execution. He consistently took ownership of complex challenges, delivered with reliability, and built strong relationships across teams and stakeholders.",
        name: "Gemini Digital Twin Team",
        role: "",
        company: "Infineon Technologies, Munich",
        logo: "/Infineon-logo.png",
      },
      {
        quote:
          "Sameer stood out for his adaptability, independent mindset, and ability to transform challenges into practical outcomes. He learned quickly, navigated demanding situations with composure, and earned the trust of colleagues and stakeholders through his collaborative and solution-oriented approach.",
        name: "14PL Team",
        role: "",
        company: "Rohde & Schwarz, Munich",
        logo: "/rohde-logo.png",
      },
      {
        quote:
          "Sameer was part of our Product Lifecycle Management team as a UX Designer Working Student. I came across some of his other work during design reviews and team meetings, which consistently stood out as thoughtful and user-centric. Sameer brought a positive attitude to the team and was always receptive to feedback. His contributions were a valuable addition to our team environment.",
        name: "Jürgen Engelbrecht",
        role: "Agile Coach",
        company: "",
        avatar: "/Jurgen.png",
      },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    headline: "Let's build something good.",
    body:
      "Whether you're building a product from scratch, rethinking an existing experience, or just want to talk design — I'd love to hear from you.",
  },
} as const;

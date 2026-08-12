// ------------------------------------------------------------------
// Dummy data for the ByteNexus Community page.
// No backend / API calls — everything here is static placeholder data
// used purely to drive the UI.
// ------------------------------------------------------------------

export const currentUser = {
  id: "u-000",
  name: "Aarav Mehta",
  username: "@aarav.codes",
  avatar: "AM",
  title: "Full-stack dev · Playground streak: 42 days",
};

export const communityPosts = [
  {
    id: "p-1",
    type: "text",
    author: {
      name: "Priya Sharma",
      username: "@priya.dev",
      avatar: "PS",
      role: "DSA Mentor",
    },
    time: "2h ago",
    tag: "DSA",
    content:
      "Finally cracked the sliding window pattern after three failed attempts on the Playground. The trick was tracking the shrink condition separately from the grow condition — sounds obvious now, felt impossible at 1am.",
    likes: 128,
    comments: 24,
    shares: 6,
    bookmarked: false,
    liked: false,
  },
  {
    id: "p-2",
    type: "code",
    author: {
      name: "Devansh Rao",
      username: "@devansh.r",
      avatar: "DR",
      role: "Backend Engineer",
    },
    time: "4h ago",
    tag: "Java",
    content:
      "Refactored my rate limiter for the Jobs board API. Token bucket implementation is way cleaner than the fixed-window counter I had before.",
    code: {
      language: "java",
      snippet:
`public class TokenBucket {
    private final int capacity;
    private double tokens;
    private final double refillRate;
    private long lastRefill;

    public boolean allowRequest() {
        refill();
        if (tokens >= 1) {
            tokens -= 1;
            return true;
        }
        return false;
    }
}`,
    },
    likes: 96,
    comments: 18,
    shares: 11,
    bookmarked: true,
    liked: true,
  },
  {
    id: "p-3",
    type: "image",
    author: {
      name: "Neha Kapoor",
      username: "@neha.builds",
      avatar: "NK",
      role: "Frontend Engineer",
    },
    time: "6h ago",
    tag: "React",
    content:
      "Shipped the dark mode redesign for my open-source component library today. Six weeks of squinting at contrast ratios, finally worth it.",
    image: true,
    likes: 214,
    comments: 41,
    shares: 19,
    bookmarked: false,
    liked: false,
  },
  {
    id: "p-4",
    type: "link",
    author: {
      name: "Rohan Iyer",
      username: "@rohan.iyer",
      avatar: "RI",
      role: "ML Engineer",
    },
    time: "9h ago",
    tag: "AI",
    content:
      "This is a genuinely good breakdown of attention mechanisms — bookmarking for anyone starting the AI track this month.",
    link: {
      title: "Attention Is All You Need — Annotated Walkthrough",
      domain: "bytenexus.dev/learn",
      description:
        "A visual, code-first explanation of transformer attention with runnable snippets in the Playground.",
    },
    likes: 87,
    comments: 9,
    shares: 22,
    bookmarked: false,
    liked: false,
  },
  {
    id: "p-5",
    type: "text",
    author: {
      name: "Simran Kaur",
      username: "@simran.k",
      avatar: "SK",
      role: "Student, CS '26",
    },
    time: "12h ago",
    tag: "Python",
    content:
      "Landed my first internship interview through the ByteNexus Jobs board! Two months ago I couldn't reverse a linked list. Grinding the Playground daily actually works, wanted to share the win.",
    likes: 342,
    comments: 58,
    shares: 14,
    bookmarked: true,
    liked: true,
  },
  {
    id: "p-6",
    type: "code",
    author: {
      name: "Arjun Verma",
      username: "@arjun.verma",
      avatar: "AV",
      role: "Competitive Programmer",
    },
    time: "1d ago",
    tag: "C++",
    content:
      "Contest editorial snippet for today's Div 2 problem C — segment tree with lazy propagation, cleaner than my last attempt.",
    code: {
      language: "cpp",
      snippet:
`void update(int node, int l, int r, int ql, int qr, int val) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) {
        lazy[node] += val;
        return;
    }
    int mid = (l + r) / 2;
    update(2*node, l, mid, ql, qr, val);
    update(2*node+1, mid+1, r, ql, qr, val);
}`,
    },
    likes: 156,
    comments: 27,
    shares: 8,
    bookmarked: false,
    liked: false,
  },
];

export const trendingTags = [
  { tag: "React", posts: "2.4k posts" },
  { tag: "Java", posts: "1.9k posts" },
  { tag: "DSA", posts: "3.1k posts" },
  { tag: "AI", posts: "4.6k posts" },
  { tag: "Python", posts: "2.8k posts" },
  { tag: "SystemDesign", posts: "980 posts" },
];

export const upcomingContest = {
  title: "Weekly Contest 187",
  startsIn: "1d 6h",
  date: "Aug 5, 2026 · 8:00 PM IST",
  difficulty: "Div 2",
  participants: "12,403 registered",
};

export const latestJobs = [
  {
    id: "j-1",
    role: "SDE Intern",
    company: "Nimbus Systems",
    location: "Remote",
    type: "Internship",
  },
  {
    id: "j-2",
    role: "Frontend Engineer",
    company: "Quanta Labs",
    location: "Bengaluru",
    type: "Full-time",
  },
  {
    id: "j-3",
    role: "Backend Developer",
    company: "Hexon Cloud",
    location: "Remote",
    type: "Full-time",
  },
];

export const topContributors = [
  { name: "Priya Sharma", username: "@priya.dev", avatar: "PS", points: "12,480 pts" },
  { name: "Arjun Verma", username: "@arjun.verma", avatar: "AV", points: "10,922 pts" },
  { name: "Neha Kapoor", username: "@neha.builds", avatar: "NK", points: "9,714 pts" },
  { name: "Devansh Rao", username: "@devansh.r", avatar: "DR", points: "8,305 pts" },
];

// Sample comment previews keyed by post id — shown under a post when
// the comment count is clicked / expanded.
export const commentPreviews = {
  "p-1": [
    { author: "Rahul S.", avatar: "RS", text: "This pattern took me a week to internalize, great writeup." },
  ],
  "p-5": [
    { author: "Devansh Rao", avatar: "DR", text: "Congrats! The consistency is the real unlock." },
  ],
};

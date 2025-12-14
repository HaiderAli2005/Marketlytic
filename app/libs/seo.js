export const seoByRoute = {
  home: {
    title: "Marketlytics",
    description:
      "Transform your business with AI-powered solutions. From MVP development to automation, we help you scale and optimize your operations with cutting-edge technology.",
  },
  "ai-assessment": {
    title: "AI Assessment & Consulting | MarketLytics",
    description:
      "Evaluate AI readiness, discover high-impact use cases, and build a clear roadmap with MarketLytics' AI assessment and consulting services.",
  },
  "ai-enablement": {
    title: "AI Enablement for Existing Products | MarketLytics",
    description:
      "Add AI capabilities to your product, optimize performance, and scale with expert AI enablement services from MarketLytics.",
  },
  "ai-frameworks": {
    title: "Custom AI Frameworks & MLOps | MarketLytics",
    description:
      "Design and build robust, scalable AI frameworks, ML pipelines, and MLOps to power innovation and speed to production.",
  },
  "generative-ai": {
    title: "Generative AI | MarketLytics",
    description:
      "Leverage AI to automate tasks, create personalized experiences, and unlock new possibilities—turning cutting-edge technology into practical solutions.",
  },
  "mvp-development": {
    title: "Build your AI MVP in 30–45 days | MarketLytics",
    description:
      "From idea to launch. We design, build, and ship AI MVPs fast—then help you scale.",
  },
  "gtm-strategies": {
    title: "GTM Strategy | MarketLytics",
    description:
      "Design and implement GTM strategies that support long-term goals, streamline operations, and unlock innovation.",
  },
  "product-strategy": {
    title: "Product Strategy | MarketLytics",
    description:
      "Design and implement product strategies that support long-term goals, streamline operations, and unlock innovation.",
  },
  automation: {
    title:
      "Automations – Automate Your Content. Accelerate Your Growth. | MarketLytics",
    description:
      "AI-powered content automations for blogs, case studies, and articles. Scale output with MarketLytics.",
  },
  "about-us": {
    title: "About Us | MarketLytics",
    description:
      "Learn about MarketLytics and our mission to help businesses optimize their workflows and unlock hidden opportunities for growth.",
  },
  "business-optimization-consulting": {
    title: "Business Optimization Consulting – MarketLytics",
    description:
      "We help organizations eliminate inefficiencies, optimize workflows, and unlock hidden opportunities for growth—turning complexity into clarity and performance.",
  },
  "ai-integration": {
    title: "AI Integration | MarketLytics",
    description:
      "Integrate AI into your business, including AI frameworks, ML pipelines, and MLOps.",
  },
  "contact-us": {
    title: "Contact Us | MarketLytics",
    description:
      "Contact us for any questions or inquiries about our services.",
  },
  projects: {
    title: "Projects | MarketLytics",
    description:
      "View our projects and see how we have helped businesses optimize their workflows and unlock hidden opportunities for growth.",
  },
  "technology-assessment": {
    title: "Technology Assessment | MarketLytics",
    description:
      "Evaluate your current technology stack and identify gaps with MarketLytics' technology assessment services.",
  },
  "technology-strategy": {
    title: "Technology Strategy | MarketLytics",
    description:
      "Design and implement technology strategies that support long-term goals, streamline operations, and unlock innovation.",
  },
  "user-experience": {
    title: "User Experience | MarketLytics",
    description:
      "Design and implement user experience strategies that support long-term goals, streamline operations, and unlock innovation.",
  },
  "web-app-development": {
    title: "Web App Development | MarketLytics",
    description:
      "Build and deploy web apps that are fast, secure, and scalable.",
  },
  "mobile-app-development": {
    title: "Mobile App Development | MarketLytics",
    description:
      "Build and deploy mobile apps that are fast, secure, and scalable.",
  },
  "design-thinking": {
    title: "Design Thinking | MarketLytics",
    description:
      "Design and implement design thinking strategies that support long-term goals, streamline operations, and unlock innovation.",
  },
  "digital-marketing": {
    title: "Digital Marketing | MarketLytics",
    description:
      "Design and implement digital marketing strategies that support long-term goals, streamline operations, and unlock innovation.",
  },
  // blog: {
  //   title: "Blog | MarketLytics",
  //   description:
  //     "Read our blog and stay up to date with the latest news and trends in the industry.",
  // },
  blogs: {
    title: "Blogs | MarketLytics",
    description:
      "Read our blog and stay up to date with the latest news and trends in the industry.",
  },
};

export function buildPageMetadata(routeKey) {
  const entry = seoByRoute[routeKey] || {};
  const title = entry.title || "Marketlytics";
  const description = entry.description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// New function to fetch metadata from database
export async function buildPageMetadataFromDB(routeKey) {
  console.log(`Fetching metadata for route: ${routeKey}`);

  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/metadata`;
    console.log(`Fetching from: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "If-Modified-Since": "0",
        "If-None-Match": "*",
      },
    });

    console.log(`Response status: ${response.status}`);
    const data = await response.json();
    console.log(`Database response:`, data);
    console.log(`Looking for route key: "${routeKey}"`);
    console.log(
      `Available routes in response:`,
      data.success ? Object.keys(data.success) : "No success object"
    );

    // Check if we have database metadata for this specific route
    if (data.success && data.success[routeKey]) {
      const routeData = data.success[routeKey];
      const title = routeData.title || "Marketlytics";
      const description = routeData.description || "";

      console.log(`✅ Using database metadata for ${routeKey}:`, {
        title,
        description,
      });

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
        },
      };
    } else {
      console.log(
        `❌ No database metadata found for ${routeKey}, using static metadata`
      );
    }
  } catch (error) {
    console.log(`❌ Error fetching metadata for ${routeKey}:`, error);
  }

  // Fallback to static metadata
  console.log(`🔄 Falling back to static metadata for ${routeKey}`);
  return buildPageMetadata(routeKey);
}

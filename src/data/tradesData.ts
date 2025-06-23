export interface Bid {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  corporation: string;
  emailSubject: string;
  emailBody: string;
  proposedBudget: string;
  proposedTimeline: string;
  submittedDate: string;
  status: "accepted" | "rejected" | "under-review" | "selected";
  attachments?: string[];
  notes?: string;
  isSelected?: boolean;
}

export interface Trade {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bids: Bid[];
  totalBids: number;
  averageBudget: string;
  status: "open" | "awarded" | "closed";
}

export interface ProjectFile {
  id: string;
  name: string;
  type: "image" | "pdf" | "xlsx";
  size: string;
  uploadedDate: string;
  url: string;
}

export interface TradeFolder {
  tradeId: string;
  tradeName: string;
  files: ProjectFile[];
}

export interface ProjectTrades {
  projectId: string;
  trades: Trade[];
  files: {
    architectural: ProjectFile[];
    scope: ProjectFile[];
    bids: TradeFolder[];
  };
}

// Company names for generating bids
const companies = [
  "ABC Construction Co.",
  "XYZ Contractors LLC",
  "Premier Builders Inc.",
  "Elite Contracting Group",
  "Summit Construction Services",
  "Peak Contractors Ltd.",
  "Valley Builders Corp.",
  "Urban Builders Group",
  "Metro Construction Services",
  "City Contractors LLC",
  "Regional Builders Inc.",
  "National Construction Co.",
  "Professional Contractors Group",
  "Advanced Building Solutions",
  "Master Craftsmen Ltd.",
  "Precision Contractors",
  "Heritage Construction Co.",
  "Modern Builders Group",
  "Quality Contractors Inc.",
  "Expert Construction Services",
  "Reliable Builders LLC",
  "Trusted Contractors Group",
  "Superior Construction Co.",
  "Prime Contractors Ltd.",
  "Apex Building Services",
  "Core Construction Group",
  "Vertex Contractors Inc.",
  "Pinnacle Builders Co.",
  "Zenith Construction Services",
  "Nova Contractors Group",
  "Orion Builders Inc.",
  "Stellar Construction Co.",
  "Galaxy Contractors Ltd.",
  "Cosmic Builders Group",
  "Universal Construction Inc.",
  "Global Contractors Co.",
  "International Builders Ltd.",
  "Worldwide Construction Group",
  "Continental Contractors Inc.",
  "Pacific Builders Co.",
];

const contactNames = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "David Wilson",
  "Lisa Anderson",
  "Robert Taylor",
  "Amanda Rodriguez",
  "James Lopez",
  "Michelle Gonzalez",
  "Daniel Perez",
  "Ashley Torres",
  "Matthew Flores",
  "Jessica Martinez",
  "Christopher Lee",
  "Amanda White",
  "Kevin Garcia",
  "Nicole Rodriguez",
  "Steven Miller",
  "Rachel Thompson",
  "Andrew Clark",
  "Lauren Lewis",
  "Ryan Hall",
  "Megan Young",
  "Justin Allen",
  "Stephanie King",
  "Brandon Wright",
  "Hannah Green",
  "Tyler Baker",
  "Victoria Adams",
  "Nathan Nelson",
  "Olivia Carter",
  "Dylan Mitchell",
  "Sofia Perez",
  "Ethan Roberts",
  "Isabella Turner",
  "Caleb Phillips",
  "Ava Campbell",
  "Mason Parker",
  "Chloe Evans",
];

// Generate files for a folder
const generateFiles = (
  count: number,
  type: "image" | "pdf" | "xlsx" | "mixed"
): ProjectFile[] => {
  const files: ProjectFile[] = [];
  const types: ("image" | "pdf" | "xlsx")[] =
    type === "mixed" ? ["pdf", "xlsx"] : [type];

  for (let i = 0; i < count; i++) {
    const fileType = types[Math.floor(Math.random() * types.length)];
    const date = new Date(
      Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
    );

    files.push({
      id: `file-${Math.random().toString(36).substr(2, 9)}-${i}`,
      name: `${
        fileType === "image"
          ? "Drawing"
          : fileType === "pdf"
          ? "Document"
          : "Sheet"
      }_${i + 1}.${fileType === "xlsx" ? "xlsx" : fileType}`,
      type: fileType,
      size: `${(Math.random() * 10).toFixed(2)} MB`,
      uploadedDate: date.toISOString(),
      url: `https://picsum.photos/seed/${Math.random()}/800/600`,
    });
  }
  return files;
};

// Generate bids for a trade
const generateBids = (
  tradeId: string,
  tradeName: string,
  numBids: number
): Bid[] => {
  const bids: Bid[] = [];
  const baseBudget = Math.floor(Math.random() * 50000) + 10000;
  const baseTimeline = Math.floor(Math.random() * 30) + 5;

  const statuses: Bid["status"][] = ["under-review", "accepted", "rejected"];

  for (let i = 0; i < numBids; i++) {
    const companyIndex = Math.floor(Math.random() * companies.length);
    const contactIndex = Math.floor(Math.random() * contactNames.length);
    const budgetVariation = Math.floor(Math.random() * 20000) - 10000;
    const timelineVariation = Math.floor(Math.random() * 10) - 5;

    const budget = Math.max(5000, baseBudget + budgetVariation);
    const timeline = Math.max(3, baseTimeline + timelineVariation);

    const status = statuses[Math.floor(Math.random() * statuses.length)];

    bids.push({
      id: `bid-${tradeId}-${i + 1}`,
      companyName: companies[companyIndex],
      contactName: contactNames[contactIndex],
      contactEmail: `${contactNames[contactIndex]
        .toLowerCase()
        .replace(" ", ".")}@${companies[companyIndex]
        .toLowerCase()
        .replace(/[^a-z]/g, "")}.com`,
      contactPhone: `(555) ${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
      corporation: companies[companyIndex],
      emailSubject: `${tradeName} Proposal - ${companies[companyIndex]}`,
      emailBody: `Dear Project Manager,\n\nWe are pleased to submit our proposal for the ${tradeName} scope of work for your construction project. Our team has extensive experience in ${tradeName.toLowerCase()} and we are confident we can deliver exceptional results.\n\nOur proposal includes:\n- Complete ${tradeName.toLowerCase()} installation\n- Quality materials and equipment\n- Experienced crew\n- Warranty coverage\n- Timeline compliance\n\nWe look forward to discussing this opportunity with you.\n\nBest regards,\n${
        companies[companyIndex]
      }`,
      proposedBudget: `$${budget.toLocaleString()}`,
      proposedTimeline: `${timeline} days`,
      submittedDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status,
      isSelected: false,
      notes:
        status === "rejected" ? "Budget too high for project scope" : undefined,
    });
  }

  // Ensure one bid is selected
  if (bids.length > 0) {
    const selectedIndex = Math.floor(Math.random() * bids.length);
    bids[selectedIndex].isSelected = true;
    bids[selectedIndex].status = "selected";
  }

  return bids;
};

// Generate trades for a project
const generateTrades = (projectId: string): Trade[] => {
  const tradeTypes = [
    {
      name: "Plumbing",
      icon: "🔧",
      description: "Water supply, drainage, and fixtures installation",
    },
    {
      name: "Electrical",
      icon: "⚡",
      description: "Power distribution, lighting, and electrical systems",
    },
    {
      name: "HVAC",
      icon: "❄️",
      description: "Heating, ventilation, and air conditioning systems",
    },
    {
      name: "Roofing",
      icon: "🏠",
      description: "Roof installation, repair, and maintenance",
    },
    {
      name: "Painting",
      icon: "🎨",
      description: "Interior and exterior painting services",
    },
    {
      name: "Masonry",
      icon: "🧱",
      description: "Brick, stone, and concrete work",
    },
    {
      name: "Carpentry",
      icon: "🔨",
      description: "Woodwork, framing, and finish carpentry",
    },
    {
      name: "Flooring",
      icon: "🏗️",
      description: "Floor installation and finishing",
    },
    {
      name: "Landscaping",
      icon: "🌳",
      description: "Landscape design and installation",
    },
    {
      name: "Demolition",
      icon: "💥",
      description: "Site clearing and demolition services",
    },
    {
      name: "Foundation",
      icon: "🏢",
      description: "Foundation and structural work",
    },
    {
      name: "Insulation",
      icon: "🧶",
      description: "Thermal and acoustic insulation",
    },
    {
      name: "Drywall",
      icon: "📋",
      description: "Drywall installation and finishing",
    },
    { name: "Tiling", icon: "🧩", description: "Tile and stone installation" },
    {
      name: "Glass & Glazing",
      icon: "🪟",
      description: "Window and glass installation",
    },
    {
      name: "Fire Protection",
      icon: "🔥",
      description: "Fire suppression and safety systems",
    },
    {
      name: "Elevator",
      icon: "🛗",
      description: "Elevator and escalator installation",
    },
    {
      name: "Security Systems",
      icon: "🔒",
      description: "Security and access control systems",
    },
    {
      name: "Telecommunications",
      icon: "📡",
      description: "Data and communication systems",
    },
    {
      name: "Site Work",
      icon: "🚧",
      description: "Site preparation and utilities",
    },
  ];

  return tradeTypes.map((trade, index) => {
    const numBids = Math.floor(Math.random() * 3) + 5; // 5-7 bids per trade
    const bids = generateBids(
      `${projectId}-trade-${index + 1}`,
      trade.name,
      numBids
    );
    const totalBudget = bids.reduce(
      (sum, bid) => sum + parseInt(bid.proposedBudget.replace(/[$,]/g, "")),
      0
    );
    const averageBudget = Math.round(totalBudget / bids.length);

    return {
      id: `${projectId}-trade-${index + 1}`,
      name: trade.name,
      description: trade.description,
      icon: trade.icon,
      color: [
        "blue",
        "yellow",
        "green",
        "red",
        "purple",
        "orange",
        "pink",
        "indigo",
        "teal",
        "cyan",
      ][index % 10],
      totalBids: bids.length,
      averageBudget: `$${averageBudget.toLocaleString()}`,
      status: ["open", "awarded", "closed"][Math.floor(Math.random() * 3)] as
        | "open"
        | "awarded"
        | "closed",
      bids,
    };
  });
};

// Generate bid files for a trade
const generateBidFiles = (
  tradeId: string,
  tradeName: string,
  numFiles: number
): ProjectFile[] => {
  const files: ProjectFile[] = [];

  for (let i = 0; i < numFiles; i++) {
    const date = new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    );

    files.push({
      id: `bid-file-${tradeId}-${i}`,
      name: `${tradeName}_Bid_${i + 1}.pdf`,
      type: "pdf",
      size: `${(Math.random() * 5 + 1).toFixed(2)} MB`,
      uploadedDate: date.toISOString(),
      url: `https://picsum.photos/seed/${Math.random()}/800/600`,
    });
  }
  return files;
};

// Generate project data including files
const generateProjectData = (projectId: string): ProjectTrades => {
  const trades = generateTrades(projectId);

  return {
    projectId,
    trades,
    files: {
      architectural: generateFiles(12, "image"),
      scope: generateFiles(8, "mixed"),
      bids: trades.map((trade) => ({
        tradeId: trade.id,
        tradeName: trade.name,
        files: generateBidFiles(
          trade.id,
          trade.name,
          Math.floor(Math.random() * 5) + 3
        ), // 3-7 files per trade
      })),
    },
  };
};

// Generate project trades data
export const sampleProjectTrades: ProjectTrades[] = [
  generateProjectData("1"),
  generateProjectData("2"),
  generateProjectData("3"),
  generateProjectData("4"),
  generateProjectData("5"),
];

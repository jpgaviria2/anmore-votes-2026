export type Candidate = {
  name: string;
  office: "Mayor" | "Councillor" | "School Trustee";
  initials: string;
  officialNote?: string;
  publicService?: string[];
};

export const candidates: Candidate[] = [
  {
    name: "Doug Richardson",
    office: "Mayor",
    initials: "DR",
    officialNote: "Unopposed",
    publicService: [
      "Current Village of Anmore councillor",
      "Chair, Public Safety Committee",
      "Liaison, Tri-Cities Region Food Council",
    ],
  },
  { name: "Harriette Chang", office: "Councillor", initials: "HC" },
  { name: "Will Crocker", office: "Councillor", initials: "WC" },
  { name: "Nylah Froese", office: "Councillor", initials: "NF" },
  { name: "Georgia Lyons", office: "Councillor", initials: "GL" },
  { name: "Neil Lyons", office: "Councillor", initials: "NL" },
  { name: "Wade Parrish", office: "Councillor", initials: "WP" },
  { name: "Rod Rempel", office: "Councillor", initials: "RR" },
  { name: "Carl Schmidt", office: "Councillor", initials: "CS" },
  {
    name: "Kim Trowbridge",
    office: "Councillor",
    initials: "KT",
    officialNote: "Incumbent",
    publicService: [
      "Current Village of Anmore councillor",
      "Chair, Parks and Recreation Committee",
      "Trustee, Sasamat Volunteer Fire Department Board",
    ],
  },
  {
    name: "Paul Weverink",
    office: "Councillor",
    initials: "PW",
    officialNote: "Incumbent",
    publicService: [
      "Current Village of Anmore councillor",
      "Chair, Environment Committee",
      "Alternate municipal director, Metro Vancouver Regional District",
    ],
  },
  {
    name: "Kerri Palmer Isaak",
    office: "School Trustee",
    initials: "KP",
    officialNote: "Sole candidate",
  },
];

export const questions = [
  "What are your three measurable priorities for the 2026–2030 term?",
  "What is your position on housing growth and the upcoming Official Community Plan process?",
  "If a new Anmore South proposal is submitted, what principles and non-negotiable conditions should guide your vote?",
  "How should Anmore balance property taxes, service levels, reserves, and long-term infrastructure costs?",
  "What should the Village do about drinking-water resilience, stormwater, septic constraints, and future infrastructure capacity?",
  "What specific wildfire prevention, evacuation, and emergency-readiness improvements would you support?",
  "How would you address traffic, road safety, transit, visitor pressure, and parking around regional destinations?",
  "How should Anmore protect forests, waterways, trails, and biodiversity while accommodating legally required housing?",
  "What changes would you make to public consultation, meeting transparency, records, and resident communications?",
  "How would you work with Metro Vancouver, Port Moody, Belcarra, SD43, the Province, and local First Nations?",
  "What experience best prepares you to govern, and where would you seek outside expertise?",
  "What potential conflicts of interest would you proactively disclose or recuse yourself from?",
];

export const schoolTrusteeQuestions = [
  "What are your three measurable priorities for students and families in Anmore and Belcarra?",
  "How would you improve student achievement and reduce gaps in outcomes?",
  "What changes would you support for inclusive education, special education, and student mental-health services?",
  "How should SD43 plan for enrolment, school capacity, seismic safety, and facility renewal?",
  "How would you balance classroom priorities, staffing, and fiscal responsibility in the district budget?",
  "What should SD43 do to improve school safety, emergency readiness, and student well-being?",
  "How will you ensure Anmore and Belcarra families are heard within a large school district?",
  "How should the board improve public consultation, transparency, and accountability?",
  "What is the appropriate role of technology, digital literacy, and artificial intelligence in schools?",
  "How would you work with Indigenous communities to advance reconciliation and student success?",
  "What experience best prepares you to govern, and where would you seek outside expertise?",
  "What potential conflicts of interest would you proactively disclose or recuse yourself from?",
];

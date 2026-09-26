export type Candidate = {
  name: string;
  office: "Mayor" | "Councillor" | "School Trustee";
  initials: string;
  officialNote?: string;
  publicService?: string[];
  biography?: string;
  professionalBackground?: string;
  portrait?: string;
  profilePath?: string;
  answers?: Partial<Record<number, string>>;
  responseApprovedAt?: string;
  website?: string;
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
    biography: "I grew up in Port Moody and Port Coquitlam after arriving from the Netherlands with my family in 1966. I moved into a 100-plus-year-old house located in the Birchwynde subdivision in Anmore in 1998 with my wife Sandy and son Ian. My son Morgan was born soon after moving here. My sons both moved away from Anmore as young adults and my wife currently lives in a long-term care facility in Port Coquitlam. I love Anmore and all it has to offer. I am an avid mountain biker. I regularly ride and walk in our local trails and swim in the local lakes.",
    professionalBackground: "I am a semi-retired Engineering Manager, working for the same company for the last 38 years. I have served on Council for the last 12 years. My work on Council includes serving as the Environment Committee Chair for 2 terms as well as three terms as an SVFD Trustee. I was the Alternate Director for the Metro Vancouver Board of Directors for two terms and I sat on the Metro Van Zero Waste Committee for one term. I was the Group Commissioner and a leader with the 1st Anmore Scouts for many years.",
    portrait: "/candidates/paul-weverink.jpg",
    profilePath: "/Paul/",
    answers: {
      0: "I have been a resident of Anmore for 28 years.",
      1: "Improve opportunities for residents to engage with Council, particularly at Council meetings. I have already started this process by putting a motion on the table to change our procedure bylaw to allow more public input at Council meetings. It was passed by Council.\n\nContinue the conversation around fire safety in the village.\n\nContinue to support our Sasamat Volunteer Fire Department.",
      2: "I am committed to a very public OCP process regarding how the Village will grow. I will look at pros and cons of the different kinds of growth scenarios proposed and ensure that residents understand my position on what I support with regards to the OCP and why.",
      3: "I have been an advocate on Council for all of those projects.",
      4: "By constantly reviewing our Asset Management Plan to ensure that money is put away for future infrastructure replacement. By continuing to ensure that development pays for itself over time or create a surplus. In the past, we have leveraged developments to pay for much needed infrastructure upgrades as part of the new developments proposed. We need to ensure that any increased density beyond current allowable zoning, benefits the village as well as the developer.",
      5: "Council worked with B.C. Hydro to manage traffic to Buntzen Lake. The reservation system has greatly reduced summer traffic in and out of the village. Without this excessive summer traffic, the village roads are under capacity with regards to regular, everyday traffic. Road safety efforts continue to be a Council and staff priority, and law enforcement may need to increase. Transit, considering our small population is fairly good and has improved over the years.",
      6: "As stated above, I continue to support the opportunities for residents to engage with Council, particularly at Council meetings. I have already started this process by putting a motion on the table to change our procedure bylaw to allow more public input at Council meetings. It was passed by Council. There are rules around public consultation that are respected by the village and will continue as such.",
      7: "12 years on Council speaks to my experience. As for outside expertise, Council works with staff and contracted consultants to provide Council with the information needed to make good decisions.",
      8: "I don’t currently have any conflicts.",
    },
  },
  {
    name: "Kerri Palmer Isaak",
    office: "School Trustee",
    initials: "KP",
    officialNote: "Sole candidate",
  },
];

export const questions = [
  "How long have you been a resident of Anmore?",
  "What are your three measurable priorities for the 2026–2030 term?",
  "What is your position on housing growth and the upcoming Official Community Plan process?",
  "How will you support community recreation in Anmore, including Spirit Park development, year-round recreation activities, and community-led projects such as a pump track?",
  "How should Anmore balance property taxes, service levels, reserves, and long-term infrastructure costs?",
  "How would you address traffic, road safety, transit, visitor pressure, and parking around regional destinations?",
  "What changes would you make to public consultation, meeting transparency, records, and resident communications?",
  "What experience best prepares you to govern, and where would you seek outside expertise?",
  "What potential conflicts of interest would you proactively disclose or recuse yourself from?",
];

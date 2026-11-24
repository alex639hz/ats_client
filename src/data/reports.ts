export type ReportKey = 'overview' | 'candidates' | 'jobs' | 'pipeline'

export interface Stat {
  label: string
  value: string
}

export interface ReportDefinition {
  key: ReportKey
  label: string
  title: string
  description: string
  stats: Stat[]
  columns: string[]
  rows: string[][]
}

// Sample data. Replace with real data from your API later.
export const reports: ReportDefinition[] = [
  {
    key: 'overview',
    label: 'Overview',
    title: 'Hiring overview',
    description: 'Summary of open roles and hiring activity this month.',
    stats: [
      { label: 'Open positions', value: '12' },
      { label: 'Active candidates', value: '148' },
      { label: 'Interviews this week', value: '23' },
      { label: 'Offers out', value: '5' },
    ],
    columns: ['Month', 'Applications', 'Interviews', 'Hires'],
    rows: [
      ['June', '210', '64', '4'],
      ['July', '185', '58', '6'],
      ['August', '242', '81', '7'],
    ],
  },
  {
    key: 'candidates',
    label: 'Candidates',
    title: 'Candidate report',
    description: 'Candidates by stage and source.',
    stats: [
      { label: 'Total candidates', value: '1,204' },
      { label: 'Avg. time to hire', value: '31 days' },
    ],
    columns: ['Source', 'Candidates', 'Hired', 'Conversion'],
    rows: [
      ['LinkedIn', '480', '12', '2.5%'],
      ['Referrals', '215', '9', '4.2%'],
      ['Job boards', '509', '6', '1.2%'],
    ],
  },
  {
    key: 'jobs',
    label: 'Jobs',
    title: 'Job postings report',
    description: 'Performance of each open job posting.',
    stats: [
      { label: 'Active jobs', value: '12' },
      { label: 'Filled this quarter', value: '7' },
    ],
    columns: ['Role', 'Department', 'Applicants', 'Days open'],
    rows: [
      ['Frontend Engineer', 'Engineering', '64', '18'],
      ['Product Designer', 'Design', '41', '9'],
      ['Account Executive', 'Sales', '97', '26'],
    ],
  },
  {
    key: 'pipeline',
    label: 'Pipeline',
    title: 'Hiring pipeline',
    description: 'How many candidates are at each stage.',
    stats: [
      { label: 'Applied', value: '320' },
      { label: 'Screening', value: '96' },
      { label: 'Interviewing', value: '41' },
    ],
    columns: ['Stage', 'Candidates', 'Avg. days in stage'],
    rows: [
      ['Applied', '320', '3'],
      ['Screening', '96', '5'],
      ['Interviewing', '41', '9'],
      ['Offer', '5', '4'],
    ],
  },
]

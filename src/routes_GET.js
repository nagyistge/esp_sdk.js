module.exports = [
  {
    fn: 'getDashboard',
    path: 'dashboard/recent.json',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getAlerts',
    path: 'reports/:id/alerts',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getAlert',
    path: 'alerts/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getCloudTrailEvents',
    path: 'alerts/:id/cloud_trail_events',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getCloudTrailEvent',
    path: 'cloud_trail_events/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getCustomSignatures',
    path: 'custom_signatures',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getCustomSignature',
    path: 'custom_signatures/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getExternalAccounts',
    path: 'external_accounts',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getExternalAccount',
    path: 'external_accounts/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getOrganizations',
    path: 'organizations',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getOrganization',
    path: 'organizations/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getRegions',
    path: 'regions',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getRegion',
    path: 'regions/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getReports',
    path: 'reports',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getReport',
    path: 'reports/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getServices',
    path: 'services',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getService',
    path: 'services/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getSignatures',
    path: 'signatures',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getSignature',
    path: 'signatures/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForReportLatest',
    path: 'stats/latest_for_teams',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getStatsForReport',
    path: 'reports/:id/stats',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForRegion',
    path: 'stats/:id/regions',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForService',
    path: 'stats/:id/regions',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForSignature',
    path: 'stats/:id/signatures',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForCustomSignature',
    path: 'stats/:id/custom_signatures',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getSuborganizations',
    path: 'sub_organizations',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getSuborganization',
    path: 'sub_organizations/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getSuppressions',
    path: 'suppressions',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getSuppression',
    path: 'suppressions/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getTagsForAlert',
    path: 'alerts/:id/tags',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getTag',
    path: 'tags/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getTeams',
    path: 'teams',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getTeam',
    path: 'teams/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getUsers',
    path: 'users',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getUser',
    path: 'users/:id',
    method: 'GET',
    num_args: 2
  }
]

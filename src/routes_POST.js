module.exports = [
  {
    fn: 'createContactRequest',
    path: 'contact_requests',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createCustomSignature',
    path: 'custom_signatures',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateCustomSignature',
    path: 'custom_signatures/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroyCustomSignature',
    path: 'custom_signatures/:id',
    method: 'DELETE',
    num_args: 3
  },
  {
    fn: 'runCustomSignatureExisting',
    path: 'custom_signatures/:id/run',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'runCustomSignatureNew',
    path: 'custom_signatures/run',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createExternalAccount',
    path: 'external_accounts',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateExternalAccount',
    path: 'external_accounts/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroyExternalAccount',
    path: 'external_accounts/:id',
    method: 'DELETE',
    num_args: 3
  },
  {
    fn: 'updateOrganization',
    path: 'organizations/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'createReport',
    path: 'reports',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'runSignature',
    path: 'signatures/:id/run',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createSubOrganization',
    path: 'sub_organizations',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateSubOrganization',
    path: 'sub_organizations/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroySubOrganization',
    path: 'sub_organizations/:id',
    method: 'DELETE',
    num_args: 3
  },
  {
    fn: 'deactivateSuppression',
    path: 'suppressions/:id/deactivate',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'createSignatureSuppression',
    path: 'suppressions/signatures',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createSignatureSuppressionByAlert',
    path: 'suppressions/alert/:id/signatures',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createRegionSuppression',
    path: 'suppressions/regions',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createRegionSuppressionByAlert',
    path: 'suppressions/alert/:id/regions',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createUniqueIdentifierSuppressionByAlert',
    path: 'suppressions/alert/:id/unique_identifiers',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createTeam',
    path: 'teams',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateTeam',
    path: 'teams/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroyTeam',
    path: 'teams/:id',
    method: 'DELETE',
    num_args: 3
  }
]

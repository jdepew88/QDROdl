CalPERS DOCX templates live in this folder. Paths are registered in data/templates.ts.

Model A — petitioner is member (current file):
  CalPERS_Model_A_Hus_Pet_Mem.docx

Merge fields (docx-templates: {{path}})
  {{case.number}}
  {{court.county}}
  {{dates.dom}}  {{dates.dos}}  {{dates.doj}}
  {{party.petitioner.full_name}}  {{party.respondent.full_name}}
  {{party.petitioner.phone}}  {{party.respondent.phone}}
  {{member.display_name}}  {{altpayee.display_name}}
  {{member.address_line1}}  {{member.address_line2}}
  {{altpayee.address_line1}}  {{altpayee.address_line2}}

Line-based pleading block (page 1, top-left example for pro per petitioner / member):
  {{party.petitioner.full_name}}
  Petitioner, In Pro Per
  {{member.address_line1}}
  {{member.address_line2}}
  {{party.petitioner.phone}}

Use separate lines in Word (one paragraph per line or single-line breaks as needed).
When respondent is member, mirror with respondent fields and altpayee vs member as appropriate.

Full merge catalog: see lib/viewModel.ts (buildViewModel return object and file header comment).

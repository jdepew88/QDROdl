Letter templates (DOCX) for the client portal
==============================================

Place these three files next to this README (filenames must match exactly):

  plan-admin-preapproval.docx
  closeout-plan-admin-service.docx
  nonfiled-dro-attachment.docx

Use Word merge fields with docx-templates syntax: {{path.to.field}}

Firm / correspondence (letters)
-------------------------------
  {{firm.name}}                 QDROdl.app
  {{firm.website}}              https://qdrodl.app
  {{firm.signer_name}}          Joseph Depew
  {{firm.signer_title}}         QDRO Support Specialist

  {{letter.date_today}}         e.g. March 27, 2026 (locale long date)

Non-filed attachment / caption block
------------------------------------
  {{attachment.case_caption_line}}     In re the case of <case number>
  {{attachment.county_court_line}}     <County> County
  {{attachment.petitioner_heading}}    Petitioner: <name>
  {{attachment.respondent_heading}}    Respondent: <name>
  {{attachment.identifiers_intro}}     Intro line for DOB/SSN section
  {{attachment.petitioner_dob}}        (raw or empty)
  {{attachment.petitioner_ssn}}
  {{attachment.respondent_dob}}
  {{attachment.respondent_ssn}}
  {{attachment.petitioner_dob_line}}   Labeled lines with placeholders if blank
  {{attachment.petitioner_ssn_line}}
  {{attachment.respondent_dob_line}}
  {{attachment.respondent_ssn_line}}
  {{attachment.identifiers_block}}     Full multi-line block for both parties

QDRO/DRO order merge fields
---------------------------
Letters also receive the full matter view model used for draft orders. See the
top-of-file comment in lib/viewModel.ts for paths such as {{caseInfo.number}},
{{court.county}}, {{party.petitioner.full_name}}, {{member.display_name}}, etc.

Remove any prior third-party letterhead from your Word originals; keep only
QDROdl.app branding in the body.

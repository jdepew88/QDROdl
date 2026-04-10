CalPERS DOCX templates live in this folder. Paths are registered in data/templates.ts.

Model A — petitioner is plan member (dual IPP variants; chosen from petitioner spouse type):
  CalPERS_Model_A_Hus_Pet_Mem_DUAL_IPP.docx   (Husband petitioner, or default)
  CalPERS_Model_A_Wife_Pet_Mem_DUAL_IPP.docx (Wife petitioner)

Model A — respondent is plan member:
  CalPERS_Model_A_Wife_Pet_Mem_DUAL_IPP.docx (same file as wife petitioner–member; merge data still maps member/altpayee from DB)

Merge fields (docx-templates: {{path}})
  {{caseInfo.number}}
  {{court.county}}
  {{dates.dom}}  {{dates.dos}}  {{dates.doj}}
  Party names (FKA): caption_full_name, address_full_name, signature_full_name (each party); full_name = caption (legacy).
  {{party.petitioner.caption_full_name}}  {{party.petitioner.address_full_name}}  {{party.petitioner.signature_full_name}}
  {{party.petitioner.phone}}  {{party.respondent.phone}}
  {{member.caption_full_name}}  {{member.address_full_name}}  {{member.signature_full_name}}
  {{member.display_name}} (= address_full_name)  {{altpayee.display_name}}
  {{member.address_line1}}  {{member.address_line2}}
  {{altpayee.address_line1}}  {{altpayee.address_line2}}

FKA example (Jane; legal/caption Doe; restoring Smith): caption JANE DOE; address line JANE SMITH (fka Doe); signature JANE SMITH.
Pro per caption_block from server is built with Petitioner/Respondent + caption + address name lines automatically.

Manual pleading lines (if not using caption_block):
  Petitioner {{party.petitioner.caption_full_name}}
  {{party.petitioner.address_full_name}}
  {{member.address_line1}}
  {{member.address_line2}}
  {{party.petitioner.phone}}

Use separate lines in Word (one paragraph per line or single-line breaks as needed).
When respondent is member, mirror with respondent fields and altpayee vs member as appropriate.

Full merge catalog: see lib/viewModel.ts (buildViewModel return object and file header comment).

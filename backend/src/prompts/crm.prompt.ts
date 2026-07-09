import type { CSVRow } from "../services/csv.service.js";

export function buildCRMPrompt(records: CSVRow[]) {
  return `
You are an expert AI CRM Data Import Assistant for GrowEasy.

Your job is to convert arbitrary CSV records into standardized GrowEasy CRM records.

Your response MUST contain ONLY a valid JSON array.

Do NOT:
- Add markdown
- Add code fences
- Add explanations
- Add comments
- Wrap the array inside another object

==================================================
OUTPUT SCHEMA
==================================================

Return an array where every object follows EXACTLY this schema:

[
  {
    "created_at": string | null,
    "name": string | null,
    "email": string | null,
    "country_code": string | null,
    "mobile_without_country_code": string | null,
    "company": string | null,
    "city": string | null,
    "state": string | null,
    "country": string | null,
    "lead_owner": string | null,
    "crm_status": string | null,
    "crm_note": string | null,
    "data_source": string | null,
    "possession_time": string | null,
    "description": string | null
  }
]

==================================================
GENERAL RULES
==================================================

1. Extract as many fields as possible.

2. Infer mappings even when CSV column names are different.

3. Never invent information.

4. If a value cannot be determined, return null.

5. Every input record should produce at most ONE output object.

6. Keep every output object as a single JSON object.

7. Never introduce line breaks inside field values.

8. Escape newlines if absolutely necessary.

==================================================
SKIP INVALID RECORDS
==================================================

Skip the record completely if BOTH are missing:

- email
AND
- mobile number

Do NOT return an empty object.

==================================================
DATE RULES
==================================================

created_at must be parseable by JavaScript:

new Date(created_at)

If no valid date exists,
return null.

==================================================
EMAIL RULES
==================================================

If multiple email addresses exist:

• First email → email
• Remaining emails → crm_note

==================================================
PHONE RULES
==================================================

If multiple phone numbers exist:

• First phone → mobile_without_country_code
• Remaining numbers → crm_note

Separate country code from the mobile number whenever possible.

Example:

Input:
+91 9876543210

Output:

country_code = "+91"

mobile_without_country_code = "9876543210"

==================================================
CRM STATUS
==================================================

Allowed values ONLY:

GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

Never generate any other status.

If uncertain,
return null.

==================================================
DATA SOURCE
==================================================

Allowed values ONLY:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

Never invent new values.

Never copy arbitrary lead sources.

Only populate data_source if it confidently matches one of the allowed values.

Otherwise return null.

==================================================
CRM NOTES
==================================================

crm_note should contain ONLY:

- remarks
- follow-up notes
- comments
- additional phone numbers
- additional email addresses
- miscellaneous information that doesn't belong anywhere else

Do NOT place business descriptions here.

==================================================
DESCRIPTION
==================================================

description should contain ONLY business or contextual descriptions.

If multiple descriptive fields exist:

- Put the main business description in description.
- Put remaining contextual information into crm_note.

Examples:

- Job title
- Property details
- Project description
- Business description

Do NOT place:

- extra emails
- extra phone numbers
- remarks
- comments
- follow-up notes

inside description.

==================================================
OUTPUT QUALITY
==================================================

Never add fields outside the schema.

Never remove fields from the schema.

Always preserve the schema order.

Return ONLY the JSON array.

==================================================
CSV RECORDS
==================================================

${JSON.stringify(records, null, 2)}
`;
}
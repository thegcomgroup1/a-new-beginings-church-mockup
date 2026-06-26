## Test the Plan Your Visit email flow

Now that the site is published, we can fire a real submission against the live endpoint and confirm both emails land.

### How I'll test

1. **POST a test submission** to `https://a-new-beginning-church.lovable.app/api/public/plan-visit` with a realistic payload (name, email, "when", note). I'll use an email address you give me as the visitor.
2. **Check the response** — expect `{ ok: true, submissionId: "..." }` with HTTP 200.
3. **Query `email_send_log`** for the two rows tied to that submission (`plan-visit-visitor-{id}` and `plan-visit-notify-{id}`) and report their status (`pending` → `sent`, or `failed`/`dlq` with the error message if anything goes wrong).
4. **Confirm inbox delivery**:
   - Visitor confirmation → the test email you provide
   - Church notification → `anewbeginningrushville@gmail.com`

If anything fails, I'll inspect the `error_message` column and the queue state, fix it, and re-run.

### Alternative: test through the live UI

If you'd rather click through it like a real visitor:
1. Open https://a-new-beginning-church.lovable.app
2. Scroll to "Plan your visit," fill in your name + email, submit
3. Tell me when you've submitted and I'll pull the matching `email_send_log` rows and report status

Either path works — the API call is faster, the UI path also validates the form wiring.

### What I need from you

- **Which email should receive the visitor confirmation for the test?** (The church notification always goes to `anewbeginningrushville@gmail.com`, so you'll see that one too if you have inbox access there.)
- Which test path you prefer (API or UI). Default: API.

# Add a Digilians certificate to the portfolio

The AI & Data Science Diploma is already listed in `src/lib/data/education.ts`.
It currently has no certificate image. Do not add a second copy of the same
credential when the certificate arrives: attach the evidence to that entry.

## 1. Prepare the file

Export the certificate as a readable JPG or PNG. If the issuer provides a PDF,
export its certificate page as an image; the `image` field is rendered by
Next.js Image and must not point directly to a PDF. Crop empty borders without
cutting off the issuer, your name, qualification, date, or verification code.
Use a descriptive lowercase filename, for example:

`public/images/certificates/digilians-ai-data-science.jpg`

An image around 1600–2200 pixels wide is usually enough for the enlarged view.
Check small text after compression. Remove private identifiers or QR links
containing private access tokens before publishing; keep public verification
information only when intended for public sharing.

## 2. Update the existing diploma entry

Open `src/lib/data/education.ts`, find the object whose `name` is
`AI & Data Science Diploma`, and add this field after `tier`:

```ts
image: "/images/certificates/digilians-ai-data-science.jpg",
```

Keep the file extension and spelling identical to the actual filename. The
browser path starts at `/images`, not `/public/images`. Filenames are
case-sensitive on the deployed Linux host.

If Digilians supplies a real public verification URL, also set `verifyUrl` to
that exact URL. If the issuer requires a code to be pasted on its verification
page, set `verifyCode` to the actual code. Both fields are optional: omit them
when no verification service is supplied. Do not invent a verification URL or
use a private Drive link as proof of public verification.

The existing certificate card automatically displays the image, opens its
full-size view, and shows the verification link when those fields are present.
No component changes are necessary. Keep `status: "Completed"` if the program
was completed; receiving the document later does not change the completion date.

## 3. If there are several distinct certificates

Add one object per genuinely different award to the `certifications` array.
Use the exact official title, issuer, award/completion date, and corresponding
image. Use `tier: "featured"` for the main AI diploma; smaller supporting courses
can use `tier: "foundation"`. Do not duplicate one diploma for each page of its
PDF. If evidence spans multiple pages, keep the main certificate as the image
and link additional public evidence only where appropriate.

## 4. Preview and publish

```sh
npm run dev
npm run lint
npm run build
```

Visit `http://localhost:3000/#certifications`. Check the image, full-size modal,
mobile layout and issuer link. Then commit the certificate image and
`src/lib/data/education.ts`, and push to the connected deployment branch. Confirm
the Vercel deployment is Ready before checking the public page.

The portfolio data and CV source are separate. Adding a certificate image does
not modify the CV automatically. If the official title, date or credential URL
also changes, update `cv/main.tex`; its workflow rebuilds the PDF/previews and
enforces the two-page limit. If only the image becomes available and the
qualification is already listed correctly, no CV content change is needed.

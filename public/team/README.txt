Team headshots go here.

Naming: use the team member's `slug` from src/content/home.ts.
  Examples:
    /public/team/andre-liu.jpg
    /public/team/co-founder.jpg
    /public/team/lead-designer.jpg

Format: square JPG or PNG. 512x512 or 1024x1024 is plenty.
The portrait is rendered as a circle, so center the face.

To wire up a member:
  1. Drop the file in this folder.
  2. Open src/content/home.ts.
  3. On the matching team entry, uncomment the `avatar:` line
     (or set `avatar: "/team/your-slug.jpg"`).
  4. Reload the page. The avatar will replace the gradient initial.

Leave a member's `avatar` field unset to keep the gradient initial.

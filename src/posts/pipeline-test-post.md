---
title: "Pipeline Test Post"
date: 2026-02-08
excerpt: "Test post to verify the 11ty publishing pipeline is working end-to-end."
author: Micaiah Bussey
tags:
  - test
---

This is a test post to verify the 11ty publishing pipeline is working correctly.

## What we're testing

- Worker creates the post in the database
- Worker pushes markdown to GitHub repo at `src/posts/`
- GitHub Actions runs 11ty build
- Site deploys with the new post on homepage and archive

If you can read this on the live site, everything is working.

*This post will be deleted after verification.*
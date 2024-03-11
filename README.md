[![Coverage Status](https://coveralls.io/repos/github/fab-ryan/my-brand-ts/badge.svg)](https://coveralls.io/github/fab-ryan/my-brand-ts)
# API Portfolio

This API Portfolio showcases various routes and functionalities for managing a portfolio application.

## Getting Started

To get started with this API, follow the steps below:

1. Clone the repository:

```bash
git clone <https://github.com/fab-ryan/my-brand-ts>

1. stall dependencies:
npm install
```

2. Create a `.env` file in the root directory and add the following environment-specific variables:

```bash
Set up environment variables:
PORT=
NODE_ENV=
LOG_LEVEL=
LOG_LABEL=
DEV_PORT=
DEV_DB_URL=
DEV_DB_PASSWORD=
DEV_DB_USERNAME=
CLOUDINARY_USER_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
TEST_PORT=
TEST_DB_URL=
TEST_DB_PASSWORD=
TEST_DB_USERNAME=
PRIVATE_KEY=
```
## Available Routes
### Blog Routes
. GET /api/blogs: Get all blogs
. GET /api/blogs/:id: Get a blog by ID
. POST /api/blogs: Create a new blog
. PUT /api/blogs/:id: Update a blog
. DELETE /api/blogs/:id: Delete a blog


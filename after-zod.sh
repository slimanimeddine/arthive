#!/bin/bash
find src/api -type f \( -name "*.ts" \) -exec sed -i 's|import axios from '\''axios'\''|import axios from '\''@/lib/axios'\''|g' {} +
npx prettier src/api/zod/schemas/**/*.ts --write
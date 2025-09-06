#!/bin/bash

# Build all packages
echo "Building all packages..."
npm run build

# Publishing order (core first, then dependencies)
packages=(
  "core"
  "hooks"
  "view-error"
  "button"
  "badge"
  "textarea"
  "checkbox"
  "copy"
  "dropzone"
  "fileInput"
  "goBack"
  "input"
  "loading"
  "otpForm"
  "popover"
  "radio"
  "select"
  "skeleton"
  "switch"
  "viewCard"
)

for package in "${packages[@]}"; do
  echo "Publishing @bearlab/$package..."
  cd "packages/$package"
  npm publish --access public
  cd "../.."
  echo "✅ Published @bearlab/$package"
done

echo "🎉 All packages published successfully!"
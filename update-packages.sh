#!/bin/bash

REPO_URL="https://github.com/hasanbala/ui-components.git"
HOMEPAGE_URL="https://github.com/hasanbala/ui-components#readme"

for dir in packages/*/; do
    if [ -f "${dir}package.json" ]; then
        package_name=$(basename "$dir")
        echo "Updating $package_name..."
        
        cat "${dir}package.json" | jq --arg repo "$REPO_URL" --arg homepage "$HOMEPAGE_URL" --arg dir "packages/$package_name" '
        . + {
            "repository": {
                "type": "git",
                "url": $repo,
                "directory": $dir
            },
            "homepage": $homepage,
            "publishConfig": {
                "access": "public"
            }
        }' > "${dir}package.json.tmp"
        
        mv "${dir}package.json.tmp" "${dir}package.json"
    fi
done

echo "Tüm package.json dosyaları güncellendi!"
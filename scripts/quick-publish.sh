#!/bin/bash

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if lerna is available
if ! command -v lerna &> /dev/null; then
    print_warning "Lerna not found globally. Using npx..."
    LERNA_CMD="npx lerna"
else
    LERNA_CMD="lerna"
fi

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show this help message"
    echo "  -c, --changed-only      Only publish packages that have changed"
    echo "  -f, --force             Force publish all packages (skip version check)"
    echo "  -v, --version TYPE      Bump version before publish (patch|minor|major)"
    echo "  --dry-run               Show what would be published without actually publishing"
    echo ""
    echo "Examples:"
    echo "  $0                      # Publish all packages with current versions"
    echo "  $0 -c                   # Publish only changed packages"
    echo "  $0 -v patch             # Bump patch version and publish all"
    echo "  $0 --dry-run            # Show what would be published"
}

# Parse command line arguments
CHANGED_ONLY=false
FORCE_PUBLISH=false
VERSION_BUMP=""
DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -c|--changed-only)
            CHANGED_ONLY=true
            shift
            ;;
        -f|--force)
            FORCE_PUBLISH=true
            shift
            ;;
        -v|--version)
            VERSION_BUMP="$2"
            if [[ ! "$VERSION_BUMP" =~ ^(patch|minor|major)$ ]]; then
                echo "Error: Version must be patch, minor, or major"
                exit 1
            fi
            shift 2
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Main execution
print_status "Starting Bearlab UI publish process..."

# Clean and build
print_status "Cleaning and building packages..."
npm run clean
npm run build:all

# Version bump if requested
if [ ! -z "$VERSION_BUMP" ]; then
    print_status "Bumping $VERSION_BUMP version..."
    $LERNA_CMD version $VERSION_BUMP --conventional-commits --yes
fi

# Publish logic
if [ "$DRY_RUN" = true ]; then
    print_status "Dry run - showing what would be published:"
    $LERNA_CMD publish --conventional-commits --dry-run
elif [ "$CHANGED_ONLY" = true ]; then
    print_status "Publishing only changed packages..."
    $LERNA_CMD publish --conventional-commits
elif [ "$FORCE_PUBLISH" = true ]; then
    print_status "Force publishing all packages..."
    $LERNA_CMD publish from-package --yes
else
    # Default: use our custom publish script for ordered publishing
    print_status "Using custom publish script for ordered publishing..."
    ./scripts/publish.sh
fi

print_success "Publish process completed!"
#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Helper functions
info() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Default values
VERSION_BUMP=""
CHANGED_ONLY=false
DRY_RUN=false
AUTO_YES=false

# Show usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show help"
    echo "  -v, --version TYPE      Bump version (patch|minor|major)"
    echo "  -c, --changed-only      Only publish changed packages"
    echo "  -y, --yes              Skip confirmation"
    echo "  --dry-run              Show what would be published"
    echo ""
    echo "Examples:"
    echo "  $0                      # Build and publish all"
    echo "  $0 -v patch             # Bump patch version and publish"
    echo "  $0 -c                   # Publish only changed packages"
    echo "  $0 --dry-run            # Preview changes"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help) usage; exit 0 ;;
        -v|--version) 
            VERSION_BUMP="$2"
            [[ ! "$VERSION_BUMP" =~ ^(patch|minor|major)$ ]] && { error "Version must be patch, minor, or major"; exit 1; }
            shift 2 ;;
        -c|--changed-only) CHANGED_ONLY=true; shift ;;
        -y|--yes) AUTO_YES=true; shift ;;
        --dry-run) DRY_RUN=true; shift ;;
        *) error "Unknown option: $1"; usage; exit 1 ;;
    esac
done

# Validation checks
validate_environment() {
    # Check if in monorepo root
    [[ ! -f "lerna.json" || ! -f "package.json" ]] && {
        error "Must be run from monorepo root"
        exit 1
    }

    # Check npm authentication
    if ! npm whoami >/dev/null 2>&1; then
        error "Not logged in to npm. Run 'npm login' first"
        exit 1
    fi

    # Check if lerna is available
    if ! command -v lerna &> /dev/null; then
        if ! command -v npx &> /dev/null; then
            error "Neither lerna nor npx found"
            exit 1
        fi
        LERNA_CMD="npx lerna"
    else
        LERNA_CMD="lerna"
    fi

    # Check for uncommitted changes
    if [[ -n $(git status --porcelain) ]]; then
        error "Working tree has uncommitted changes. Please commit or stash them first."
        exit 1
    fi
}

# Build packages
build_packages() {
    info "Building packages..."
    
    # Clean first
    npm run clean >/dev/null 2>&1 || true
    
    # Build core first, then components
    if ! npm run build:core; then
        error "Core build failed"
        exit 1
    fi
    
    if ! npm run build:components; then
        error "Components build failed"
        exit 1
    fi
    
    success "All packages built successfully"
}

# Get confirmation
get_confirmation() {
    [[ "$AUTO_YES" == "true" || "$DRY_RUN" == "true" ]] && return 0
    
    echo
    read -p "$(echo -e "${YELLOW}Proceed with publishing? [y/N]: ${NC}")" -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]] || { warning "Cancelled"; exit 0; }
}

# Main publish logic
publish_packages() {
    if [[ "$DRY_RUN" == "true" ]]; then
        info "DRY RUN - Showing what would be published:"
        $LERNA_CMD publish --conventional-commits --dry-run
        return 0
    fi

    # Version bump if requested
    if [[ -n "$VERSION_BUMP" ]]; then
        info "Bumping $VERSION_BUMP version..."
        $LERNA_CMD version $VERSION_BUMP --conventional-commits --yes
    fi

    # Publish logic
    if [[ "$CHANGED_ONLY" == "true" ]]; then
        info "Publishing changed packages..."
        $LERNA_CMD publish --conventional-commits --yes
    else
        info "Publishing all packages..."
        $LERNA_CMD publish from-package --yes
    fi
}

# Main execution
main() {
    info "Starting Bearlab UI publish process..."
    
    validate_environment
    build_packages
    get_confirmation
    publish_packages
    
    success "🎉 Publish process completed successfully!"
}

# Run main function
main "$@"
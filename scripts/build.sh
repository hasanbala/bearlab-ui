#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Helper functions
info() { echo -e "${BLUE}[BUILD]${NC} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Default values
CLEAN=false
COMPONENTS_ONLY=false
SPECIFIC_PACKAGES=()

# Show usage
usage() {
    echo "Usage: $0 [OPTIONS] [PACKAGES...]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show help"
    echo "  -c, --clean             Clean before building"
    echo "  --components-only       Build only components"
    echo ""
    echo "Examples:"
    echo "  $0                      # Build all packages"
    echo "  $0 --clean              # Clean and build all"
    echo "  $0 button input         # Build specific packages"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help) usage; exit 0 ;;
        -c|--clean) CLEAN=true; shift ;;
        --components-only) COMPONENTS_ONLY=true; shift ;;
        -*) error "Unknown option: $1"; usage; exit 1 ;;
        *) SPECIFIC_PACKAGES+=("$1"); shift ;;
    esac
done

# Validate options
if [[ ${#SPECIFIC_PACKAGES[@]} -gt 0 && "$COMPONENTS_ONLY" == "true" ]]; then
    warning "--components-only flag is deprecated. Building all packages or specific packages instead."
fi

# Clean if requested
clean_packages() {
    [[ "$CLEAN" != "true" ]] && return
    info "Cleaning packages..."
    npm run clean >/dev/null 2>&1 || true
    success "Packages cleaned"
}

# Build all packages
build_all() {
    info "Building all packages..."
    if ! npm run build; then
        error "Build failed"
        exit 1
    fi
    success "All packages built successfully"
}

# Build specific packages
build_specific() {
    local packages=("$@")

    for package in "${packages[@]}"; do
        info "Building $package..."
        if npx lerna run build --scope="@bearlab/$package" 2>/dev/null; then
            success "Built $package"
        else
            error "Failed to build $package (package may not exist or build error)"
            exit 1
        fi
    done
}

# Show build artifacts
show_artifacts() {
    info "Build artifacts:"
    for dir in packages/*/dist; do
        [[ -d "$dir" ]] && {
            package_name=$(basename $(dirname "$dir"))
            echo "  📦 $package_name"
        }
    done
}

# Main execution
main() {
    info "Starting build process..."

    clean_packages

    if [[ ${#SPECIFIC_PACKAGES[@]} -gt 0 ]]; then
        build_specific "${SPECIFIC_PACKAGES[@]}"
    else
        # Build all (default)
        build_all
    fi

    show_artifacts
    success "Build process completed!"
}

main "$@"
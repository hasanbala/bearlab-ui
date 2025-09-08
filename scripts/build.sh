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
CORE_ONLY=false
COMPONENTS_ONLY=false
SPECIFIC_PACKAGES=()

# Show usage
usage() {
    echo "Usage: $0 [OPTIONS] [PACKAGES...]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show help"
    echo "  -c, --clean             Clean before building"
    echo "  --core-only             Build only core package"
    echo "  --components-only       Build only components (exclude core)"
    echo ""
    echo "Examples:"
    echo "  $0                      # Build all packages"
    echo "  $0 --clean              # Clean and build all"
    echo "  $0 --core-only          # Build only core"
    echo "  $0 button input         # Build specific packages"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help) usage; exit 0 ;;
        -c|--clean) CLEAN=true; shift ;;
        --core-only) CORE_ONLY=true; shift ;;
        --components-only) COMPONENTS_ONLY=true; shift ;;
        -*) error "Unknown option: $1"; usage; exit 1 ;;
        *) SPECIFIC_PACKAGES+=("$1"); shift ;;
    esac
done

# Validate options
if [[ "$CORE_ONLY" == "true" && "$COMPONENTS_ONLY" == "true" ]]; then
    error "Cannot use --core-only and --components-only together"
    exit 1
fi

if [[ ${#SPECIFIC_PACKAGES[@]} -gt 0 && ("$CORE_ONLY" == "true" || "$COMPONENTS_ONLY" == "true") ]]; then
    error "Cannot specify packages with --core-only or --components-only"
    exit 1
fi

# Clean if requested
clean_packages() {
    [[ "$CLEAN" != "true" ]] && return
    info "Cleaning packages..."
    npm run clean >/dev/null 2>&1 || true
    success "Packages cleaned"
}

# Build core package
build_core() {
    info "Building core package..."
    if ! npm run build:core; then
        error "Core build failed"
        exit 1
    fi
    success "Core built successfully"
}

# Build components
build_components() {
    info "Building components..."
    if ! npm run build:components; then
        error "Components build failed"
        exit 1
    fi
    success "Components built successfully"
}

# Build specific packages
build_specific() {
    local packages=("$@")
    local core_needed=false
    
    # Check if core is needed
    for package in "${packages[@]}"; do
        [[ "$package" != "core" ]] && { core_needed=true; break; }
    done
    
    # Build core first if needed and not explicitly included
    if [[ "$core_needed" == "true" && ! " ${packages[*]} " =~ " core " ]]; then
        build_core
    fi
    
    # Build each package
    for package in "${packages[@]}"; do
        info "Building $package..."
        if npm run "build:$package" 2>/dev/null; then
            success "Built $package"
        else
            error "Failed to build $package (package may not exist)"
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
    
    if [[ "$CORE_ONLY" == "true" ]]; then
        build_core
    elif [[ "$COMPONENTS_ONLY" == "true" ]]; then
        build_components
    elif [[ ${#SPECIFIC_PACKAGES[@]} -gt 0 ]]; then
        build_specific "${SPECIFIC_PACKAGES[@]}"
    else
        # Build all (default)
        build_core
        build_components
    fi
    
    show_artifacts
    success "Build process completed!"
}

# Run main function
main "$@"
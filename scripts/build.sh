#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[BUILD]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] [PACKAGES...]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show this help message"
    echo "  -c, --clean             Clean before building"
    echo "  -w, --watch             Watch mode (rebuild on changes)"
    echo "  -p, --parallel          Build packages in parallel"
    echo "  --core-only             Build only core package"
    echo "  --components-only       Build only component packages (exclude core)"
    echo ""
    echo "Examples:"
    echo "  $0                      # Build all packages"
    echo "  $0 --clean              # Clean and build all packages"
    echo "  $0 button input         # Build only button and input packages"
    echo "  $0 --core-only          # Build only core package"
    echo "  $0 --components-only    # Build all components (exclude core)"
}

# Parse command line arguments
CLEAN=false
WATCH=false
PARALLEL=false
CORE_ONLY=false
COMPONENTS_ONLY=false
SPECIFIC_PACKAGES=()

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -c|--clean)
            CLEAN=true
            shift
            ;;
        -w|--watch)
            WATCH=true
            shift
            ;;
        -p|--parallel)
            PARALLEL=true
            shift
            ;;
        --core-only)
            CORE_ONLY=true
            shift
            ;;
        --components-only)
            COMPONENTS_ONLY=true
            shift
            ;;
        -*)
            echo "Unknown option: $1"
            show_usage
            exit 1
            ;;
        *)
            SPECIFIC_PACKAGES+=("$1")
            shift
            ;;
    esac
done

# Validate conflicting options
if [ "$CORE_ONLY" = true ] && [ "$COMPONENTS_ONLY" = true ]; then
    print_error "Cannot use --core-only and --components-only together"
    exit 1
fi

if [ ${#SPECIFIC_PACKAGES[@]} -gt 0 ] && ([ "$CORE_ONLY" = true ] || [ "$COMPONENTS_ONLY" = true ]); then
    print_error "Cannot specify specific packages with --core-only or --components-only"
    exit 1
fi

print_status "Starting build process..."

# Clean if requested
if [ "$CLEAN" = true ]; then
    print_status "Cleaning all packages..."
    npm run clean
    print_success "Cleaned all packages"
fi

# Build logic
if [ "$CORE_ONLY" = true ]; then
    print_status "Building core package only..."
    npm run build:core
    print_success "Core package built successfully"
    
elif [ "$COMPONENTS_ONLY" = true ]; then
    print_status "Building component packages only..."
    if [ "$PARALLEL" = true ]; then
        npm run build:components
    else
        npm run build:components
    fi
    print_success "Component packages built successfully"
    
elif [ ${#SPECIFIC_PACKAGES[@]} -gt 0 ]; then
    print_status "Building specific packages: ${SPECIFIC_PACKAGES[*]}"
    
    # Build core first if it's not in the list but other packages depend on it
    core_needed=false
    for package in "${SPECIFIC_PACKAGES[@]}"; do
        if [ "$package" != "core" ]; then
            core_needed=true
            break
        fi
    done
    
    if [ "$core_needed" = true ] && [[ ! " ${SPECIFIC_PACKAGES[*]} " =~ " core " ]]; then
        print_status "Building core package first (dependency)..."
        npm run build:core
    fi
    
    # Build specific packages
    for package in "${SPECIFIC_PACKAGES[@]}"; do
        print_status "Building $package..."
        if npm run "build:$package" 2>/dev/null; then
            print_success "Built $package"
        else
            print_error "Failed to build $package or package doesn't exist"
            exit 1
        fi
    done
    
else
    # Build all packages (default)
    if [ "$WATCH" = true ]; then
        print_status "Starting watch mode..."
        print_warning "Watch mode not implemented yet. Building once..."
    fi
    
    print_status "Building all packages..."
    
    if [ "$PARALLEL" = true ]; then
        print_status "Using parallel build..."
        npm run build:core
        npm run build:components
    else
        npm run build:all
    fi
    
    print_success "All packages built successfully"
fi

print_success "Build process completed!"

# Show build artifacts
print_status "Build artifacts:"
for dir in packages/*/dist; do
    if [ -d "$dir" ]; then
        package_name=$(basename $(dirname "$dir"))
        echo "  📦 $package_name -> $dir"
    fi
done